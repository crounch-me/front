import { actions } from './actions';
import { ListActions, ListMutations } from './keys';
import { callAction, initContext } from '@/utils/test';
import { ListState } from '.';
import { createList, getOwnerLists, deleteList } from '@/api/list';
import { List } from '@/models/list';

jest.mock('@/api/list');

describe('Actions', () => {
  const NAME = 'shopping';
  const ID = 'list id';
  const list: List = {
    id: ID,
    name: NAME,
  };
  const lists: List[] = [list];

  const context = initContext<ListState>({
    dispatch: jest.fn(),
    commit: jest.fn(),
  });

  const callListAction = callAction(context, actions);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('CREATE', () => {
    beforeEach(() => {
      (createList as jest.Mock).mockResolvedValue(list);
    });

    it('Should call api with right parameters.', () => {
      callListAction(ListActions.CREATE, { name });

      expect(createList as jest.Mock).toHaveBeenCalledWith(name);
    });

    it('Should call add mutation with the new list.', done => {
      callListAction(ListActions.CREATE, { name });

      setTimeout(() => {
        expect(context.commit as jest.Mock).toBeCalledWith(ListMutations.ADD, list);
        done();
      });
    });

    describe('GETOWNERS', () => {
      beforeEach(() => {
        (getOwnerLists as jest.Mock).mockResolvedValue(lists);
      });

      it('Should call api.', () => {
        callListAction(ListActions.GETOWNERS);

        expect(getOwnerLists as jest.Mock).toHaveBeenCalled();
      });

      it('Should call set mutation with the returned lists.', done => {
        callListAction(ListActions.GETOWNERS);

        setTimeout(() => {
          expect(context.commit as jest.Mock).toBeCalledWith(ListMutations.SET, lists);
          done();
        });
      });
    });

    describe('DELETE', () => {
      beforeEach(() => {
        (deleteList as jest.Mock).mockResolvedValue({})
      })

      it('Should call api.', () => {
        callListAction(ListActions.DELETE, { id: ID })

        expect(deleteList).toHaveBeenCalled();
      })

      it('Should commit delete when request succeed.', done => {
        callListAction(ListActions.DELETE, { id: ID })

        setTimeout(() => {
          expect(context.commit as jest.Mock).toBeCalledWith(ListMutations.DELETE, ID)
          done()
        })
      })

      it('Should not commit when request failed.', done => {
        const ERROR = {
          error: 'list-not-found-error'
        };
        (deleteList as jest.Mock).mockRejectedValue(ERROR)

        callListAction(ListActions.DELETE, { id: ID })
          .then(() => expect(true).toBeFalsy())
          .catch((err: any) => {
            expect(err).toBe(ERROR)
            done()
          })
      })
    })
  });
});

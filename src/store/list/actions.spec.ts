import { actions } from './actions';
import { ListActions, ListMutations } from './keys';
import { callAction, initContext } from '@/utils/test';
import { ListState } from '.';
import { createList, getOwnerLists } from '@/api/list';
import { List } from '@/models/list';

jest.mock('@/api/list');

describe('Actions', () => {
  const name = 'shopping';
  const id = 'list id';
  const list: List = {
    id,
    name,
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
  });
});

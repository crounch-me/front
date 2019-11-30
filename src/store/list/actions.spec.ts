import { actions } from './actions';
import { ListKeys } from './keys';
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
      callListAction(ListKeys.CREATE, { name });

      expect(createList as jest.Mock).toHaveBeenCalledWith(name);
    });

    it('Should call add mutation with the new list.', done => {
      callListAction(ListKeys.CREATE, { name });

      setTimeout(() => {
        expect(context.commit as jest.Mock).toBeCalledWith(ListKeys.ADD, list);
        done();
      });
    });

    describe('GETOWNERS', () => {
      beforeEach(() => {
        (getOwnerLists as jest.Mock).mockResolvedValue(lists);
      });

      it('Should call api.', () => {
        callListAction(ListKeys.GETOWNERS);

        expect(getOwnerLists as jest.Mock).toHaveBeenCalled();
      });

      it('Should call set mutation with the returned lists.', done => {
        callListAction(ListKeys.GETOWNERS);

        setTimeout(() => {
          expect(context.commit as jest.Mock).toBeCalledWith(ListKeys.SET, lists);
          done();
        });
      });
    });
  });
});

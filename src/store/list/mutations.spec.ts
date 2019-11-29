import { mutations } from './mutations';
import { ListKeys } from './keys';
import { ListState } from '.';
import { List } from '@/models/list';

describe('Mutations', () => {
  describe('ADD', () => {
    it('Should add the list in the state.', () => {
      const list: List = {
        id: 'list id',
        name: 'hello',
      };
      const state: ListState = { lists: [] };

      mutations[ListKeys.ADD](state, list);

      expect(state.lists).toStrictEqual([list]);
    });
  });
});

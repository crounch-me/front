import { mutations } from './mutations';
import { ListMutations } from './keys';
import { ListState } from '.';
import { List } from '@/models/list';

describe('Mutations', () => {
  const list: List = {
    id: 'list id',
    name: 'hello',
  };
  const lists: List[] = [list];
  describe('ADD', () => {
    it('Should add the list in the state.', () => {
      const state: ListState = { lists: [] };

      mutations[ListMutations.ADD](state, list);

      expect(state.lists).toStrictEqual([list]);
    });
  });

  describe('SET', () => {
    it('Should set the list into the state.', () => {
      const state: ListState = { lists: [] };

      mutations[ListMutations.SET](state, lists);

      expect(state.lists).toStrictEqual(lists);
    });
  });

  describe('RESET', () => {
    it('Should empty the list of lists.', () => {
      const state: ListState = { lists };

      mutations[ListMutations.RESET](state);

      expect(state.lists).toStrictEqual([]);
    });
  });
});

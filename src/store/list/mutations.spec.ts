import { mutations } from './mutations';
import { ListMutations } from './keys';
import { ListState } from '.';
import { List } from '@/models/list';

describe('Mutations', () => {
  const list: List = {
    id: 'list id',
    name: 'hello',
  };
  describe('ADD', () => {
    const lists: List[] = [list];

    it('Should add the list in the state.', () => {
      const state: ListState = { lists: [] };

      mutations[ListMutations.ADD](state, list);

      expect(state.lists).toStrictEqual([list]);
    });
  });

  describe('SET', () => {
    const lists: List[] = [list];

    it('Should set the list into the state.', () => {
      const state: ListState = { lists: [] };

      mutations[ListMutations.SET](state, lists);

      expect(state.lists).toStrictEqual(lists);
    });
  });

  describe('RESET', () => {
    const lists: List[] = [list];

    it('Should empty the list of lists.', () => {
      const state: ListState = { lists };

      mutations[ListMutations.RESET](state);

      expect(state.lists).toStrictEqual([]);
    });
  });

  describe('DELETE', () => {
    const ID_1 = 'ID1'
    const ID_2 = 'ID2'
    const lists: List[] = [
      {
        id: ID_1,
        name: 'hello',
      },
      {
        id: ID_2,
        name: 'hello',
      }
    ]

    it('Should remove the found list in state.', () => {
      const state: ListState = { lists };

      mutations[ListMutations.DELETE](state, ID_2);

      expect(state.lists).toHaveLength(1);
      expect(state.lists[0]).toEqual(lists[0]);
    })

    it('Should not remove a list when the id is not found', () => {
      const state: ListState = { lists };

      mutations[ListMutations.DELETE](state, 'random id');

      expect(state.lists).toEqual(lists)
    })
  })
});

import { getters } from './getters';
import { ListState } from '.';
import { ListGetters } from './keys';

describe('Getters', () => {
  const emptyRootState = { dummy: '' };

  describe('lists', () => {
    it('Should return the lists in the state.', () => {
      const state: ListState = {
        lists: [
          {
            id: 'list id',
            name: 'hello'
          }
        ]
      };

      const result = getters[ListGetters.LISTS](state, { getters }, emptyRootState, {});

      expect(result).toBeTruthy();
    });
  });
});

import { getters } from './getters';
import { ListState } from '.';

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

      const result = getters.lists(state, { getters }, emptyRootState, {});

      expect(result).toBeTruthy();
    });
  });
});

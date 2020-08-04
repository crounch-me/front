import { getters } from './getters';
import { ListState } from '.';
import { ListGetters } from './keys';

describe('Getters', () => {
  const emptyRootState = { dummy: '' };
  const list1 = {
    id: 'list id 1',
    name: 'hello',
    products: []
  };
  const list2 = {
    id: 'list id 2',
    name: 'hello 2',
    products: []
  };
  const initialState: ListState = {
    lists: [list1, list2],
  };


  describe('lists', () => {
    it('Should return the lists in the state.', () => {
      const result = getters[ListGetters.GETALL](initialState, undefined, emptyRootState, {});

      expect(result).toBeTruthy();
    });
  });

  describe('get', () => {
    it('Should return the list with given id in the state.', () => {
      const result = getters[ListGetters.GET](initialState, undefined, emptyRootState, { id: list2.id })(list2.id);

      expect(result).toEqual(list2);
    });
  });
});

import { GetterTree } from 'vuex';
import { ListState } from '.';
import { RootState } from '..';
import { ListGetters } from './keys';

export const getters: GetterTree<ListState, RootState> = {
  [ListGetters.GETALL]: state => state.lists,
  [ListGetters.GET]: state => (id: string) => state.lists.find(list => list.id === id),
};

import { GetterTree } from 'vuex';
import { ListState } from '.';
import { RootState } from '..';
import { ListGetters } from './keys';

export const getters: GetterTree<ListState, RootState> = {
  [ListGetters.LISTS]: state => state.lists,
};

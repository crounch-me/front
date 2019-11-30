import { GetterTree } from 'vuex';
import { ListState } from '.';
import { RootState } from '..';

export const getters: GetterTree<ListState, RootState> = {
  lists: state => state.lists,
};

import { MutationTree } from 'vuex';
import { ListState } from '.';
import { ListKeys } from './keys';
import { List } from '@/models/list';

export const mutations: MutationTree<ListState> = {
  [ListKeys.ADD](state, list: List) {
    state.lists = [...state.lists, list];
  },
  [ListKeys.SET](state, lists: List[]) {
    state.lists = lists;
  },
  [ListKeys.RESET](state) {
    state.lists = [];
  }
};

import { MutationTree } from 'vuex';
import { ListState } from '.';
import { ListMutations } from './keys';
import { List } from '@/models/list';

export const mutations: MutationTree<ListState> = {
  [ListMutations.ADD](state, list: List) {
    state.lists = [...state.lists, list];
  },
  [ListMutations.SET](state, lists: List[]) {
    state.lists = lists;
  },
  [ListMutations.DELETE](state, id) {
    state.lists = state.lists.filter(list => list.id !== id)
  },
  [ListMutations.RESET](state) {
    state.lists = [];
  }
};

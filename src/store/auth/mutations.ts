import { MutationTree } from 'vuex';
import { AuthState } from '.';
import { AuthMutations } from './keys';

export const mutations: MutationTree<AuthState> = {
  [AuthMutations.LOGIN](state, token: string) {
    state.token = token;
  },
  [AuthMutations.LOGOUT](state) {
    state.token = '';
  },
};

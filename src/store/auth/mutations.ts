import { MutationTree } from 'vuex';
import { AuthState } from '.';
import { AuthKeys } from './keys';

export const mutations: MutationTree<AuthState> = {
  [AuthKeys.LOGIN](state, token: string) {
    state.token = token;
  },
  [AuthKeys.LOGOUT](state) {
    state.token = '';
  },
};

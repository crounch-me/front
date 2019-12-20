import { GetterTree } from 'vuex';
import { AuthState } from '.';
import { RootState } from '..';
import { AuthGetters } from './keys';

export const getters: GetterTree<AuthState, RootState> = {
  [AuthGetters.IS_AUTHENTICATED]: state => !!state.token,
};

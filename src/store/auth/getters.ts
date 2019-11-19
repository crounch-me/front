import { GetterTree } from 'vuex';
import { AuthState } from '.';
import { RootState } from '..';

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: state => !!state.token,
};

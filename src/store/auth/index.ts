import { Module } from 'vuex';

import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState } from '..';

export interface AuthState {
  token: string;
  status: string;
}

export const state: AuthState = {
  token: localStorage.getItem(TOKEN_STORAGE_KEY) || '',
  status: '',
};

const namespaced: boolean = true;
export const authNamespace = { namespace: 'auth' };

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

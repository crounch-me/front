import { AuthKeys } from './keys';
import { Module } from 'vuex';
import { AuthState } from '.';
import { RootState } from '..';

const actions = {
  [AuthKeys.SIGNUP]: jest.fn(),
  [AuthKeys.LOGIN]: jest.fn(),
  [AuthKeys.LOGOUT]: jest.fn(),
};

const getters = {
  isAuthenticated: jest.fn(),
};

export function createAuthModuleMock(): Module<AuthState, RootState> {
  return {
    namespaced: true,
    actions,
    getters,
    state: {
      token: '',
      status: '',
    },
  };
}

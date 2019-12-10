import { Module } from 'vuex';

import { AuthActions, AuthMutations, AuthGetters } from './keys';
import { AuthState } from '.';
import { RootState } from '..';
import { createStoreModuleMock } from '../test';

export function createAuthModuleMock(): Module<AuthState, RootState> {
  const initialState: AuthState = {
    token: '',
    status: '',
  };

  return createStoreModuleMock(initialState, AuthActions, AuthMutations, AuthGetters);
}

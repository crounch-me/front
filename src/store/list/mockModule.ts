import { Module } from 'vuex';

import { ListActions, ListMutations, ListGetters } from './keys';
import { ListState } from '.';
import { RootState } from '..';
import { createStoreModuleMock } from '../test';

export function createListModuleMock(): Module<ListState, RootState> {
  const initialState: ListState = {
    lists: [],
  };

  return createStoreModuleMock(initialState, ListActions, ListMutations, ListGetters);
}

import { Module } from 'vuex';

import { ListKeys } from './keys';
import { ListState } from '.';
import { RootState } from '..';

const actions = {
  [ListKeys.CREATE]: jest.fn(),
  [ListKeys.CREATED]: jest.fn(),
};

const getters = {
};

export function createListModuleMock(): Module<ListState, RootState> {
  return {
    namespaced: true,
    actions,
    getters,
    state: {
      lists: [],
    },
  };
}

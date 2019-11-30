import { Module } from 'vuex';

import { ListKeys } from './keys';
import { ListState } from '.';
import { RootState } from '..';

const actions = {
  [ListKeys.CREATE]: jest.fn(),
  [ListKeys.CREATED]: jest.fn(),
  [ListKeys.GETOWNERS]: jest.fn(),
};

const getters = {
  lists: jest.fn(),
};

const mutations = {
  [ListKeys.RESET]: jest.fn(),
};

export function createListModuleMock(): Module<ListState, RootState> {
  return {
    namespaced: true,
    actions,
    getters,
    mutations,
    state: {
      lists: [],
    },
  };
}

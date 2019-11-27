import { Module } from 'vuex';

import { actions } from './actions';
import { RootState } from '..';
import { List } from '@/models/list';

export interface ListState {
  lists: List[];
}

export const state: ListState = {
  lists: [],
};

const namespaced: boolean = true;
export const listNamespace = { namespace: 'list' };

export const list: Module<ListState, RootState> = {
  namespaced,
  state,
  actions,
};

import { Module } from 'vuex';

import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { RootState } from '..';
import { Product } from '@/models/product';

export interface ProductState {
  products: Product[];
}

export const state: ProductState = {
  products: [],
};

const namespaced: boolean = true;
export const productNamespace = { namespace: 'product' };

export const product: Module<ProductState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};

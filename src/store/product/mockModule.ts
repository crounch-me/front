import { Module } from 'vuex';

import { ProductActions, ProductMutations, ProductGetters } from './keys';
import { ProductState } from '.';
import { RootState } from '..';
import { createStoreModuleMock } from '../test';

export function createProductModuleMock(): Module<ProductState, RootState> {
  const initialState: ProductState = {
    products: [],
  };

  return createStoreModuleMock(initialState, ProductActions, ProductMutations, ProductGetters);
}

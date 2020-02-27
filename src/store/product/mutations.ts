import { MutationTree } from 'vuex';
import { ProductState } from '.';
import { ProductMutations } from './keys';
import { Product } from '@/models/product';

export const mutations: MutationTree<ProductState> = {
  [ProductMutations.ADD](state, product: Product) {
    state.products = [...state.products, product];
  },
};

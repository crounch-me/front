import { ActionTree } from 'vuex';
import { createProduct } from '@/api/product';

import { ProductState } from '.';
import { RootState } from '..';
import { ProductActions, ProductMutations } from './keys';

export const actions: ActionTree<ProductState, RootState> = {
  [ProductActions.CREATE]: ({ commit }, { name }): Promise<void> => {
    return createProduct(name).then(product => {
      commit(ProductMutations.ADD, product);
      return
    });
  },
};

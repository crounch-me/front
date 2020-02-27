import { mutations } from './mutations';
import { ProductMutations } from './keys';
import { ProductState } from '.';
import { Product } from '@/models/product';

describe('Mutations', () => {
  const product: Product = {
    id: 'product id',
    name: 'hello',
  };

  describe('ADD', () => {
    it('Should add the product in the state.', () => {
      const state: ProductState = { products: [] };

      mutations[ProductMutations.ADD](state, product);

      expect(state.products).toStrictEqual([product]);
    });
  });
});

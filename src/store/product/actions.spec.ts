import { actions } from './actions';
import { ProductActions, ProductMutations } from './keys';
import { callAction, initContext } from '@/utils/test';
import { ProductState } from '.';
import { createProduct } from '@/api/product';
import { Product } from '@/models/product';

jest.mock('@/api/product');

describe('Product Actions', () => {
  const name = 'cassoulet';
  const id = 'product id';
  const product: Product = {
    id,
    name,
  };

  const context = initContext<ProductState>({
    dispatch: jest.fn(),
    commit: jest.fn(),
  });

  const callProductAction = callAction(context, actions);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('CREATE', () => {
    beforeEach(() => {
      (createProduct as jest.Mock).mockResolvedValue(product);
    });

    it('Should call api with right parameters.', () => {
      callProductAction(ProductActions.CREATE, { name });

      expect(createProduct as jest.Mock).toHaveBeenCalledWith(name);
    });

    it('Should call add mutation with the new product.', done => {
      callProductAction(ProductActions.CREATE, { name });

      setTimeout(() => {
        expect(context.commit as jest.Mock).toBeCalledWith(ProductMutations.ADD, product);
        done();
      });
    });
  });
});

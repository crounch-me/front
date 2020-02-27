import { when } from 'jest-when';
import { doFetch, FetchOptions } from './api';
import { createProduct } from './product';
import { Product } from '@/models/product';

jest.mock('./api');

describe('Product API', () => {
  const name = 'shopping';
  const product: Product = {
    id: 'list id',
    name,
  };
  const expectedCreateOptions: FetchOptions = {
    url: 'products',
    method: 'POST',
    data: {
      name
    }
  };

  beforeEach(() => {
    (doFetch as jest.Mock).mockClear();
    when(doFetch as jest.Mock).calledWith(expectedCreateOptions).mockResolvedValue(product);
  });

  describe('createProduct', () => {
    it('Should call create product endpoint with right parameters.', done => {
      createProduct(name).then(() => {
        expect(doFetch).toHaveBeenCalledWith(expectedCreateOptions);
        done();
      });
    });

    it('Should return product from the endpoint.', done => {
      createProduct(name).then(res => {
        expect(res).toEqual(product)
        done();
      });
    });
  });
});

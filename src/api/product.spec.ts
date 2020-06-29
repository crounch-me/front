import { when } from 'jest-when';
import { doFetch, FetchOptions } from './api';
import { createProduct, searchProduct } from './product';
import { Product } from '@/models/product';

jest.mock('./api');

describe('Product API', () => {
  const name = 'cassoulet';
  const product: Product = {
    id: 'product id',
    name,
  };

  beforeEach(() => {
    (doFetch as jest.Mock).mockClear();
  });

  describe('createProduct', () => {
    const expectedCreateOptions: FetchOptions = {
      url: 'products',
      method: 'POST',
      data: {
        name
      }
    };

    beforeEach(() => {
      when(doFetch as jest.Mock).calledWith(expectedCreateOptions).mockResolvedValue(product);
    })

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

  describe('searchProduct', () => {
    const expectedSearchOptions: FetchOptions = {
      url: 'products/search',
      method: 'POST',
      data: {
        name
      }
    }

    beforeEach(() => {
      when(doFetch as jest.Mock).calledWith(expectedSearchOptions).mockResolvedValue([product])
    })

    it('Should call search product endpoint with right parameters.', done => {
      searchProduct(name).then(() => {
        expect(doFetch).toHaveBeenCalledWith(expectedSearchOptions);
        done();
      });
    });

    it('Should return products from the endpoint.', done => {
      searchProduct(name).then(res => {
        expect(res).toEqual([product])
        done();
      });
    });
  });
});

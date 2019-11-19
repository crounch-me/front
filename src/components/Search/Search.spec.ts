import { Wrapper } from '@vue/test-utils';

import Search from './Search.vue';
import { shallowComponent } from '@/utils/test';
import { search } from '@/api/openfoodfacts';
import { convertProductFromApi } from '@/utils/converters/product';
import { ProductApi, Product } from '@/models/product';
import { when } from 'jest-when';

jest.mock('@/api/openfoodfacts');
jest.mock('@/utils/converters/product');

describe('Search', () => {
  let wrapper: Wrapper<Search>;
  const name = 'Saucisse';

  const productsApi: ProductApi[] = [
    {
      product_name: 'product name',
      code: '82793',
      categories: 'Hello, World',
    },
  ];

  const products: Product[] = [
    {
      name: 'product name',
      barCode: '82793',
      categories: ['Hello', 'World'],
    },
  ];

  beforeEach(() => {
    when(search as jest.Mock)
      .calledWith(name)
      .mockResolvedValue(productsApi);
    when(convertProductFromApi as jest.Mock)
      .calledWith(productsApi)
      .mockReturnValue(products);
    wrapper = shallowComponent(Search);
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Init', () => {
    it('Should initialize name with empty string.', () => {
      expect(wrapper.vm.$data.name).toBe('');
    });

    it('Should initialize products with an empty array.', () => {
      expect(wrapper.vm.$data.products).toEqual([]);
    });
  });

  it('Should call api when key is up in input.', () => {
    searchProduct();

    expect(search).toBeCalledWith(name);
  });

  it('Should convert products when the request succeed', () => {
    searchProduct();

    expect(convertProductFromApi).toHaveBeenCalledWith(productsApi);
  });

  it('Should set products from the request when it succeed.', done => {
    searchProduct();

    setTimeout(() => {
      expect(wrapper.vm.$data.products).toEqual(products);
      done();
    });
  });

  it('Should display the products when the request succeed.', done => {
    searchProduct();

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('Should not display products when there is no products.', () => {
    expect(wrapper.find('#products').exists()).toBeFalsy();
  });

  function searchProduct() {
    wrapper.setData({ name });

    wrapper.find('input').trigger('keyup');
  }
});

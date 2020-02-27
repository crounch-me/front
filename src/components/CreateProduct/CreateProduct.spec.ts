import { Wrapper } from '@vue/test-utils';
import { Module } from 'vuex';

import { shallowComponent } from '@/utils/test';
import CreateProduct from './CreateProduct.vue';
import { ProductActions } from '@/store/product/keys';
import { createProductModuleMock } from '@/store/product/mockModule';
import { ProductState } from '@/store/product';
import { RootState } from '@/store';

jest.mock('@/store/product');

describe('CreateProduct', () => {
  let wrapper: Wrapper<CreateProduct>;
  let product: Module<ProductState, RootState>;
  const name = 'shopping list';

  beforeEach(() => {
    product = createProductModuleMock();

    const modules = {
      product,
    };

    wrapper = shallowComponent(CreateProduct, { modules });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('State', () => {
    it('Should initialize product name state to empty string.', () => {
      expect(wrapper.vm.$data.name).toBe('');
    });

    it('Should initialize result state to empty string.', () => {
      expect(wrapper.vm.$data.result).toBe('');
    });
  });

  describe('Form validation', () => {
    it('Should render an error when name is not valid.', () => {
      expect(wrapper.find('#name-error').exists()).toBeTruthy();
    });

    it('Should not render an error when name is valid.', () => {
      wrapper.setData({ name });

      expect(wrapper.find('#name-error').exists()).toBeFalsy();
    });
  });

  it('Should not dispatch create product store action when form is not valid.', () => {
    wrapper.find('[type=submit]').trigger('click');

    expect(product.actions![ProductActions.CREATE] as jest.Mock).not.toHaveBeenCalled();
  });

  it('Should dispatch create product store action when form is valid and submitted.', done => {
    wrapper.setData({ name });

    wrapper.find('[type=submit]').trigger('click');

    setTimeout(() => {
      expect(product.actions![ProductActions.CREATE] as jest.Mock).toHaveBeenCalledWith(
        expect.anything(),
        { name },
      );
      done();
    });
  });

  it('Should display result message when request succeed.', done => {
    wrapper.setData({ name });

    wrapper.find('[type=submit]').trigger('click');

    setTimeout(() => {
      expect(wrapper.find('.result').text()).toEqual('Créée')
      done();
    });
  });

  it('Should reset name when request succeed.', done => {
    wrapper.setData({ name });

    wrapper.find('[type=submit]').trigger('click');

    setTimeout(() => {
      expect(wrapper.vm.$data.name).toBe('');
      done();
    });
  });
});

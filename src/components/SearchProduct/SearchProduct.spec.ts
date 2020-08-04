import { Wrapper } from '@vue/test-utils';

import { shallowComponent } from '@/utils/test';
import SearchProduct from './SearchProduct.vue'
import { searchProduct } from '@/api/product';
import { Product } from '@/models/product';
import { Events } from '@/utils/events';

jest.mock('@/api/product')

describe('SearchProduct', () => {
  let wrapper: Wrapper<SearchProduct>;
  const NAME = 'abc'

  const PRODUCT: Product = {
    id: 'id',
    name: NAME,
  }

  beforeEach(() => {
    wrapper = shallowComponent(SearchProduct);

    (searchProduct as jest.Mock).mockResolvedValue([PRODUCT])
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Init', () => {
    it('Should initialize name to empty string.', () => {
      expect(wrapper.vm.$data.name).toBe('');
    });

    it('Should initialize products to empty array.', () => {
      expect(wrapper.vm.$data.products).toEqual([]);
    });
  });

  describe('Search', () => {
    it('Should not call API when name length is lower than 3.', () => {
      wrapper.setData({ name: 'a' });

      expect(searchProduct as jest.Mock).not.toHaveBeenCalled()
    })

    it('Should call API when name length is greater or equal to 3.', done => {
      wrapper.setData({ name: NAME })

      wrapper.find('[type=text]').trigger('keyup')

      setTimeout(() => {
        expect(searchProduct as jest.Mock).toHaveBeenCalledWith(NAME)
        done()
      })
    })

    it('Should render found products list.', done => {
      wrapper.setData({ name: NAME })

      wrapper.find('[type=text]').trigger('keyup')

      setTimeout(() => {
        expect(wrapper).toMatchSnapshot()
        done()
      })
    })

    it('Should remove products when input is reset.', done => {
      wrapper.setData({ products: [PRODUCT] })
      wrapper.setData({ name: '' })
      wrapper.find('[type=text]').trigger('keyup')

      setTimeout(() => {
        expect(wrapper.vm.$data.products).toEqual([])
        done()
      })
    })
  })

  describe('Add product to list event', () => {
    it('Should emit event when a product is clicked.', done => {
      wrapper.setData({ products: [PRODUCT] })

      setTimeout(() => {
        wrapper.find('.product button').trigger('click')
        expect(wrapper.emitted()[Events.ADD_PRODUCT][0][0]).toEqual(PRODUCT)
        done()
      })
    })
  })
})

import { shallowComponent } from '@/utils/test'
import DisplayProducts from './DisplayProducts.vue'
import { Product } from '@/models/product'
import { Events } from '@/utils/events'

describe('DisplayProducts', () => {
  it('Should render a message when there is no products.', () => {
    const values = {
      products: [],
    }

    const wrapper = shallowComponent(DisplayProducts, { values })

    expect(wrapper).toMatchSnapshot()
  })

  it('Should render the products list when there is products.', () => {
    const products: Product[] = [
      {
        id: 'product id',
        name: 'product name'
      }
    ]
    const values = {
      products
    }

    const wrapper = shallowComponent(DisplayProducts, { values })

    expect(wrapper).toMatchSnapshot()
  })

  it('Should emit delete product event with product id on click on delete button.', done => {
    const products: Product[] = [
      {
        id: 'product id',
        name: 'product name'
      }
    ]
    const values = {
      products
    }

    const wrapper = shallowComponent(DisplayProducts, { values })

    setTimeout(() => {
      wrapper.find('.delete').trigger('click')
      expect(wrapper.emitted()[Events.DELETE_PRODUCT][0][0]).toEqual(products[0].id)
      done()
    })
  })
})

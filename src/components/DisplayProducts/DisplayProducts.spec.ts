import { shallowComponent } from '@/utils/test'
import DisplayProducts from './DisplayProducts.vue'
import { Product } from '@/models/product'

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
})

import { convertProductFromApi } from './product';
import { ProductApi, Product } from '@/models/product';

describe('Product converter', () => {
  it('Should convert product api to product', () => {
    const productsApi: ProductApi[] = [
      {
        product_name: 'product name',
        categories: 'Salad, Green',
        code: '1234',
      }
    ];

    const expectedProducts: Product[] = [
      {
        name: 'product name',
        categories: ['Salad', 'Green'],
        barCode: '1234',
      }
    ]
    const products = convertProductFromApi(productsApi);

    expect(products).toEqual(expectedProducts);
  });
});

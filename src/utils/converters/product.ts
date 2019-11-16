import { ProductApi, Product } from '@/models/product';

export function convertProductFromApi(productsApi: ProductApi[]): Product[] {
  return productsApi.map(productApi => ({
    name: productApi.product_name,
    categories: productApi.categories.replace(' ', '').split(','),
    barCode: productApi.code,
  }));
}

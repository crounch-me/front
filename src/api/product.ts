import { doFetch } from './doFetch';
import { Product } from '@/models/product';

export function createProduct(name: string): Promise<Product> {
  return doFetch({
    path: 'products',
    method: 'POST',
    data: { name }
  });
}

export function searchProduct(name: string): Promise<Array<Product>> {
  return doFetch({
    path: 'products/search',
    method: 'POST',
    data: { name }
  })
}

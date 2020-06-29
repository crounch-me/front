import { doFetch } from './api';
import { Product } from '@/models/product';

export function createProduct(name: string): Promise<Product> {
  return doFetch({
    url: 'products',
    method: 'POST',
    data: { name }
  });
}

export function searchProduct(name: string): Promise<Array<Product>> {
  return doFetch({
    url: 'products/search',
    method: 'POST',
    data: { name }
  })
}

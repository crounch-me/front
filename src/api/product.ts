import { doFetch } from './api';
import { Product } from '@/models/product';

export function createProduct(name: string): Promise<Product> {
  return doFetch({
    url: 'products',
    method: 'POST',
    data: { name }
  });
}

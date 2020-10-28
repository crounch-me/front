import { Category } from './category';

interface Product {
  id: string;
  name: string;
  category?: Category
}

interface ProductInGetListResponse {
  id: string
  name: string
  buyed: boolean
}

export { Product, ProductInGetListResponse }

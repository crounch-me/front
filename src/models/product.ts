import { Category } from './category';

interface Product {
  id: string
  name: string
  category?: Category
}

interface ProductInSelectedList {
  id: string
  name: string
  category: Category
  bought: boolean
}

export { Product, ProductInSelectedList }

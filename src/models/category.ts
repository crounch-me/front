import { ProductInSelectedList } from './product'

interface Category {
  id: string
  name: string
}

interface CategoryInSelectedList {
  id: string
  name: string
  products: ProductInSelectedList[]
}

export { Category, CategoryInSelectedList }

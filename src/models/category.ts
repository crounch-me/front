import { ProductInGetListResponse } from './product'

interface Category {
  id: string
  name: string
}

interface CategoryInGetListResponse {
  id: string
  name: string
  products: ProductInGetListResponse
}

export { Category, CategoryInGetListResponse }

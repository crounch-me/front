import { Product } from './product';
import { CategoryInGetListResponse } from './category';

interface List {
  id: string
  name: string
  products: Product[]
}

interface GetListResponse {
  id: string
  name: string
  creationDate: string
  categories: CategoryInGetListResponse[]
}

export { List, GetListResponse }

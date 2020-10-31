import { Product } from './product';
import { CategoryInSelectedList } from './category';

interface List {
  id: string
  name: string
  products: Product[]
}

interface SelectedList {
  id: string
  name: string
  creationDate: string
  categories: CategoryInSelectedList[]
}

export { List, SelectedList }

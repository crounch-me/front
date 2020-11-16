import { CategoryInSelectedList } from './category';

interface List {
  id: string
  name: string
  creationDate: string
  archivationDate?: string
}

interface SelectedList {
  id: string
  name: string
  creationDate: string
  archivationDate?: string
  categories: CategoryInSelectedList[]
}

export { List, SelectedList }

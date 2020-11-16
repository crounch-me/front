import store from '..'
import { addProductToList, archiveList, createList, deleteList, deleteProductInList, getUsersLists, readList } from '@/api/list';
import { SelectedList, List } from '@/models/list'
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import { Product, ProductInSelectedList } from '@/models/product';
import { CategoryInSelectedList } from '@/models/category';
import { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_NAME } from '@/utils/constants';
import { SetArchivationDatePayload } from './payloads';

@Module({ dynamic: true, store, name: 'list', namespaced: true })
export class ListModule extends VuexModule {
  lists: List[] = []
  selectedList: SelectedList | null = null

  get all() {
    return this.lists
  }

  get one() {
    return (id: string) => this.lists.find(list => list.id === id)
  }

  get selected() {
    return this.selectedList
  }

  get isSelectedListArchived() {
    if (this.selectedList) {
      return !!this.selectedList.archivationDate
    }
    return false
  }

  get productsInSelectedList() {
    const productsInList: ProductInSelectedList[] = []

    if (this.selectedList) {
      this.selectedList!.categories.forEach(category => productsInList.push(...category.products))
    }

    return productsInList
  }

  @Mutation
  add(list: List) {
    this.lists = [...this.lists, list];
  }

  @Mutation
  set(lists: List[]) {
    this.lists = lists
  }

  @Mutation
  setSelectedList(selectedList: SelectedList) {
    this.selectedList = selectedList
  }

  @Mutation
  setArchivationDate({ listID, archivationDate }: SetArchivationDatePayload) {
    const list = this.lists.find(l => l.id === listID)
    if (list) {
      list.archivationDate = archivationDate
    }
  }

  @Mutation
  setSelectedListArchivationDate(archivationDate: string) {
    if (this.selectedList) {
      this.selectedList.archivationDate = archivationDate
    }
  }

  @Mutation
  delete(id: string) {
    this.lists = this.lists.filter(list => list.id !== id)
  }

  @Mutation
  reset() {
    this.lists = []
  }

  @Mutation
  addProduct(product: ProductInSelectedList) {
    const newCategories = [...this.selectedList!.categories]
    const categoryIndex = newCategories.findIndex(category => category.id === product.category?.id)

    if (categoryIndex === -1) {
      if (product.category) {
        const newCategory: CategoryInSelectedList = {
          ...product.category!,
          products: [product]
        }
        newCategories.unshift(newCategory)
      } else {
        const lastIndex = newCategories.length - 1
        if (newCategories.length && newCategories[lastIndex].id === DEFAULT_CATEGORY_ID) {
          newCategories[lastIndex].products.push(product)
        } else {
          const newDefaultCategory: CategoryInSelectedList = {
            id: DEFAULT_CATEGORY_ID,
            name: DEFAULT_CATEGORY_NAME,
            products: [product]
          }

          newCategories.push(newDefaultCategory)
        }
      }
    } else {
      newCategories[categoryIndex].products.push(product)
    }

    this.selectedList!.categories = newCategories
  }

  @Mutation
  deleteProduct(product: ProductInSelectedList) {
    const newCategories = [...this.selectedList!.categories]
    let category: CategoryInSelectedList | undefined

    if (!product.category) {
      category = newCategories.find(category => category.id === DEFAULT_CATEGORY_ID)
    } else {
      category = newCategories.find(category => category.id === product.category!.id)
    }

    if (!category) {
      return
    }

    const productIndex = category.products.findIndex(productInCategory => productInCategory.id === product.id)
    category.products.splice(productIndex, 1)

    this.selectedList!.categories = newCategories
  }

  @Action({ commit: 'add' })
  async create(name: string) {
    return createList(name)
  }

  @Action({ commit: 'set' })
  async getUsers() {
    return getUsersLists()
  }

  @Action({ commit: 'delete' })
  async deleteAction(id: string) {
    await deleteList(id)
    return id
  }

  @Action({ commit: 'addProduct' })
  async addProductAction(product: Product) {
    if (!this.selectedList) {
      return
    }

    await addProductToList(product.id, this.selectedList!.id)

    const productInSelectedList: ProductInSelectedList = {
      ...product,
      buyed: false,
    }

    return productInSelectedList
  }

  @Action({ commit: 'deleteProduct' })
  async deleteProductAction(product: ProductInSelectedList) {
    if (!this.selectedList) {
      return
    }

    await deleteProductInList(product.id, this.selectedList!.id)
    return product
  }

  @Action
  async archiveList(listID: string) {
    const list = this.one(listID)
    if (!list) {
      return
    }

    const { archivationDate } = await archiveList(listID)
    if (archivationDate) {
      if (this.selectedList?.id === listID) {
        this.setSelectedListArchivationDate(archivationDate)
      }

      this.setArchivationDate({ listID, archivationDate })
    }
  }

  @MutationAction
  async selectList(id: string) {
    const selectedList = await readList(id)
    return { selectedList }
  }
}

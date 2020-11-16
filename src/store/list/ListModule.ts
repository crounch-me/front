import Vue from 'vue'
import store from '..'
import { addProductToList, archiveList, createList, deleteList, deleteProductInList, getUsersLists, readList, setBuyedProductInList } from '@/api/list';
import { SelectedList, List } from '@/models/list'
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import { Product, ProductInSelectedList } from '@/models/product';
import { CategoryInSelectedList } from '@/models/category';
import { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_NAME } from '@/utils/constants';
import { SetArchivationDatePayload, SetBuyedProductActionPayload } from './payloads';

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
    const listIndex = this.lists.findIndex(l => l.id === listID)
    if (listIndex !== -1) {
      const newList = {
        ...this.lists[listIndex],
        archivationDate
      }

      Vue.set(this.lists, listIndex, newList)
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
    this.selectedList = null
  }

  @Mutation
  addProduct(product: ProductInSelectedList) {
    const newCategories = [...this.selectedList!.categories]
    const categoryIndex = newCategories.findIndex(category => category.id === product.category.id)

    if (categoryIndex === -1) {
      const newCategory: CategoryInSelectedList = {
        ...product.category,
        products: [product]
      }
      newCategories.unshift(newCategory)
    } else {
      newCategories[categoryIndex].products.push(product)
    }

    this.selectedList!.categories = newCategories
  }

  @Mutation
  deleteProduct(product: ProductInSelectedList) {
    const categoryIndex = this.selectedList!.categories.findIndex(category => category.id === product.category.id)

    if (categoryIndex === -1) {
      return
    }

    const newCategory = {
      ...this.selectedList!.categories[categoryIndex],
    }

    const productIndex = newCategory.products.findIndex(productInCategory => productInCategory.id === product.id)

    newCategory.products.splice(productIndex, 1)

    Vue.set(this.selectedList!.categories, categoryIndex, newCategory)
  }

  @Mutation
  async setBuyedProduct({ product, buyed }: SetBuyedProductActionPayload) {
    if (!this.selectedList) {
      return
    }

    const newCategories = [...this.selectedList.categories]

    let category: CategoryInSelectedList | undefined

    category = newCategories.find(categoryInList => categoryInList.id === product.category.id)

    if (!category) {
      return
    }

    const foundProduct = category.products.find(productInCategory => productInCategory.id === product.id)
    if (!foundProduct) {
      return
    }

    foundProduct.buyed = buyed
    this.selectedList.categories = newCategories
  }

  @Action({ commit: 'setBuyedProduct' })
  async setBuyedProductAction(setBuyedProductAction: SetBuyedProductActionPayload) {
    if (!this.selectedList) {
      return
    }

    const { product, buyed } = setBuyedProductAction

    await setBuyedProductInList(product.id, this.selectedList.id, buyed)

    return setBuyedProductAction
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

    const category = product.category ? product.category : {
      id: DEFAULT_CATEGORY_ID,
      name: DEFAULT_CATEGORY_NAME
    }

    const productInSelectedList: ProductInSelectedList = {
      ...product,
      category,
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

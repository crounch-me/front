import store from '.'
import { addProductToList, createList, deleteList, deleteProductInList, getOwnerLists, readList, setBuyedProductInList } from '@/api/list';
import { SelectedList, List } from '@/models/list'
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import { Product, ProductInSelectedList } from '@/models/product';
import { CategoryInSelectedList } from '@/models/category';
import { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_NAME } from '@/utils/constants';

export interface SetBuyedProductActionPayload {
  product: ProductInSelectedList
  buyed: boolean
}

@Module({ dynamic: true, store, name: 'list' })
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
    const newCategories = [...this.selectedList!.categories]
    let category: CategoryInSelectedList | undefined

    category = newCategories.find(category => category.id === product.category.id)

    if (!category) {
      return
    }

    const productIndex = category.products.findIndex(productInCategory => productInCategory.id === product.id)
    category.products.splice(productIndex, 1)

    this.selectedList!.categories = newCategories
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
  async getOwners() {
    return getOwnerLists()
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

  @MutationAction
  async selectList(id: string) {
    const selectedList = await readList(id)
    return { selectedList }
  }
}

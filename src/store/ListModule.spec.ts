import { ListModule } from './ListModule';
import { SelectedList, List } from '@/models/list'
import { Product, ProductInSelectedList } from '@/models/product';
import { Category, CategoryInSelectedList } from '@/models/category';
import { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_NAME } from '@/utils/constants';

describe('ListModule', () => {
  const unknownId = 'unknown-id'

  const id1 = 'list-id1'
  const name1 = 'list-name1'
  const list1: List = {
    id: id1,
    name: name1,
    products: []
  }

  const id2 = 'list-id2'
  const name2 = 'list-name2'
  const list2: List = {
    id: id2,
    name: name2,
    products: []
  }

  const selectedListId = 'selected-list-id'
  const selectedListName = 'selected-list-name'
  const selectedListCreationDate = 'selected-list-creation-date'
  const selectedList: SelectedList = {
    id: selectedListId,
    name: selectedListName,
    creationDate: selectedListCreationDate,
    categories: []
  }

  const categoryId = 'category-id'
  const categoryName = 'category-name'
  const productId = 'product-id'
  const productName = 'product-name'
  const product: Product = {
    id: productId,
    name: productName,
  }
  const category: Category = {
    id: categoryId,
    name: categoryName,
  }

  const defaultCategory: Category = {
    id: DEFAULT_CATEGORY_ID,
    name: DEFAULT_CATEGORY_NAME
  }

  const productWithoutCategoryInSelectedList: ProductInSelectedList = {
    ...product,
    buyed: false,
  }

  const productWithCategoryInSelectedList: ProductInSelectedList = {
    ...productWithoutCategoryInSelectedList,
    category,
  }

  let listModule: ListModule

  beforeEach(() => {
    listModule = new ListModule(ListModule)
  })

  describe('init', () => {
    it('Should initialize the lists with an empty list array', () => {
      expect(listModule.lists).toEqual([])
    })

    it('Should initialize the selectedList with null', () => {
      expect(listModule.selectedList).toBeNull()
    })
  })

  describe('Getter', () => {
    describe('all', () => {
      it('should return the lists array', () => {
        listModule.lists.push(list1)
        listModule.lists.push(list2)

        const result = listModule.all

        expect(result).toHaveLength(2)
        expect(result[0]).toEqual(list1)
        expect(result[1]).toEqual(list2)
      })
    })


    describe('one', () => {
      it('should return the list is in state', () => {
        listModule.lists.push(list1)
        listModule.lists.push(list2)

        const result = listModule.one(id2)

        expect(result).toEqual(list2)
      })

      it('should return undefined when the list is not in state', () => {
        listModule.lists.push(list1)
        listModule.lists.push(list2)

        const result = listModule.one(unknownId)

        expect(result).toBeUndefined()
      })
    })

    describe('selected', () => {
      it('should return null where no list has been selected', () => {
        const result = listModule.selected

        expect(result).toBeNull()
      })

      it('should return selected list when one list is selected', () => {
        listModule.selectedList = selectedList

        const result = listModule.selected

        expect(result).toEqual(selectedList)
      })
    })

    describe('productsInSelectedList', () => {
      it('should return all the products of the selected list when list is defined', () => {
        listModule.selectedList = selectedList

        const categoryInSelectedList: CategoryInSelectedList = {
          ...category,
          products: [productWithCategoryInSelectedList]
        }

        const defaultCategoryInSelectedList: CategoryInSelectedList = {
          ...defaultCategory,
          products: [productWithoutCategoryInSelectedList]
        }

        listModule.selectedList.categories.push(categoryInSelectedList, defaultCategoryInSelectedList)

        const result = listModule.productsInSelectedList

        expect(result).toHaveLength(2)
        expect(result[0]).toEqual(productWithCategoryInSelectedList)
        expect(result[1]).toEqual(productWithoutCategoryInSelectedList)
      })

      it('should return an empy array when list is not defined', () => {
        const result = listModule.selectedList

        expect(result).toBeNull()
      })
    })
  })

  describe('Mutation', () => {
    describe('add', () => {
      it('should add the list to the state', () => {
        listModule.lists.push(list1)

        listModule.add(list2)

        expect(listModule.lists).toHaveLength(2)
        expect(listModule.lists[0]).toEqual(list1)
        expect(listModule.lists[1]).toEqual(list2)
      })
    })

    describe('set', () => {
      it('should replace the lists in state with the lists', () => {
        listModule.lists.push(list1)

        listModule.set([list2])

        expect(listModule.lists).toHaveLength(1)
        expect(listModule.lists[0]).toEqual(list2)
      })
    })

    describe('delete', () => {
      it('should delete the list in the state', () => {
        listModule.lists.push(list1)
        listModule.lists.push(list2)

        listModule.delete(id2)

        expect(listModule.lists).toHaveLength(1)
        expect(listModule.lists[0]).toEqual(list1)
      })
    })

    describe('reset', () => {
      it('should reset the lists state to an empty array', () => {
        listModule.lists.push(list1)

        listModule.reset()

        expect(listModule.lists).toEqual([])
      })
    })

    describe('addProduct', () => {
      it('should add product to the existing category in the list', () => {
        const categoryInSelectedList: CategoryInSelectedList = {
          ...category,
          products: []
        }

        listModule.selectedList = {
          ...selectedList,
          categories: [
            categoryInSelectedList
          ]
        }

        listModule.addProduct(productWithCategoryInSelectedList)

        expect(listModule.selectedList!.categories).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products[0]).toEqual(productWithCategoryInSelectedList)
      })

      it('should add product to a new category before default category in the list', () => {
        const defaultCategoryInSelectedList: CategoryInSelectedList = {
          ...defaultCategory,
          products: []
        }

        listModule.selectedList = {
          ...selectedList,
          categories: [defaultCategoryInSelectedList]
        }

        listModule.addProduct(productWithCategoryInSelectedList)

        expect(listModule.selectedList!.categories).toHaveLength(2)

        expect(listModule.selectedList!.categories[0].id).toBe(categoryId)
        expect(listModule.selectedList!.categories[0].name).toBe(categoryName)
        expect(listModule.selectedList!.categories[0].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products[0]).toEqual(productWithCategoryInSelectedList)

        expect(listModule.selectedList!.categories[1].id).toBe(DEFAULT_CATEGORY_ID)
        expect(listModule.selectedList!.categories[1].name).toBe(DEFAULT_CATEGORY_NAME)
        expect(listModule.selectedList!.categories[1].products).toHaveLength(0)

      })

      it('should add product to default category in the list when it exists', () => {
        const defaultCategoryInSelectedList: CategoryInSelectedList = {
          ...defaultCategory,
          products: []
        }

        listModule.selectedList = {
          ...selectedList,
          categories: [defaultCategoryInSelectedList]
        }

        listModule.addProduct(productWithoutCategoryInSelectedList)

        expect(listModule.selectedList!.categories).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products[0]).toEqual(productWithoutCategoryInSelectedList)
      })

      it('should create default category and add the product to it when the category does not exist', () => {
        listModule.selectedList = {
          ...selectedList,
          categories: []
        }

        listModule.addProduct(productWithoutCategoryInSelectedList)

        expect(listModule.selectedList!.categories).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products[0]).toEqual(productWithoutCategoryInSelectedList)
      })
    })

    describe('deleteProduct', () => {
      let categoryInSelectedList: CategoryInSelectedList
      let defaultCategoryInSelectedList: CategoryInSelectedList

      beforeEach(() => {
        categoryInSelectedList = {
          ...category,
          products: [productWithCategoryInSelectedList]
        }

        defaultCategoryInSelectedList = {
          ...defaultCategory,
          products: [productWithoutCategoryInSelectedList]
        }

        listModule.selectedList = {
          ...selectedList,
          categories: [categoryInSelectedList, defaultCategoryInSelectedList]
        }
      })

      it('should delete product from category in the list when the product has a category', () => {
        listModule.deleteProduct(productWithCategoryInSelectedList)

        expect(listModule.selectedList!.categories[0].products).toHaveLength(0)
        expect(listModule.selectedList!.categories[1].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[1].products[0]).toEqual(productWithoutCategoryInSelectedList)
      })

      it('should do nothing when the product has a category but it is not found', () => {
        const productWithUnknownCategoryInSelectedList: ProductInSelectedList = {
          ...productWithoutCategoryInSelectedList,
          category: {
            id: 'unknown',
            name: 'unknown'
          },
        }

        listModule.deleteProduct(productWithUnknownCategoryInSelectedList)

        expect(listModule.selectedList!.categories).toHaveLength(2)

        expect(listModule.selectedList!.categories[0].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products[0]).toEqual(productWithCategoryInSelectedList)
        expect(listModule.selectedList!.categories[1].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[1].products[0]).toEqual(productWithoutCategoryInSelectedList)
      })

      it('should delete product from default category when it does not have one', () => {
        listModule.deleteProduct(productWithoutCategoryInSelectedList)

        expect(listModule.selectedList!.categories).toHaveLength(2)

        expect(listModule.selectedList!.categories[0].products).toHaveLength(1)
        expect(listModule.selectedList!.categories[0].products[0]).toEqual(productWithCategoryInSelectedList)
        expect(listModule.selectedList!.categories[1].products).toHaveLength(0)

      })
    })
  })
})

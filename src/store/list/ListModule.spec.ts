import { ListModule } from './ListModule';
import { SelectedList, List } from '@/models/list'
import { Product, ProductInSelectedList } from '@/models/product';
import { Category, CategoryInSelectedList } from '@/models/category';
import { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_NAME } from '@/utils/constants';
import { addProductToList, archiveList, createList, deleteList, deleteProductInList, getUsersLists, readList } from '@/api/list';

jest.mock('@/api/list')

describe('ListModule', () => {
  const unknownId = 'unknown-id'

  const id1 = 'list-id1'
  const name1 = 'list-name1'
  const creationDate1 = 'creation-date1'
  const list1: List = {
    id: id1,
    name: name1,
    creationDate: creationDate1
  }

  const id2 = 'list-id2'
  const name2 = 'list-name2'
  const creationDate2 = 'creation-date2'
  const list2: List = {
    id: id2,
    name: name2,
    creationDate: creationDate2
  }

  const archivationDate = 'archivation-date'

  const newName = 'new-name'

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

    describe('isSelectedListArchived', () => {
      it('should return false if there is no selected list', () => {
        const result = listModule.isSelectedListArchived

        expect(result).toBeFalsy()
      })

      it('should return false if the selected list does not have an archivation date', () => {
        listModule.selectedList = selectedList

        const result = listModule.isSelectedListArchived

        expect(result).toBeFalsy()
      })

      it('should return true if the selected list have an archivation date', () => {
        const listWithArchivationDate = {
          ...selectedList,
          archivationDate
        }

        listModule.selectedList = listWithArchivationDate

        const result = listModule.isSelectedListArchived

        expect(result).toBeTruthy()
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

    describe('setSelectedList', () => {
      it('should set the selected list in state', () => {
        listModule.setSelectedList(selectedList)

        expect(listModule.selectedList).toEqual(selectedList)
      })
    })

    describe('setArchivationDate', () => {
      const archivationPayload = {
        listID: id1,
        archivationDate
      }

      it('should not throw an error when list is not found', () => {
        try {
          listModule.setArchivationDate(archivationPayload)
        } catch(err) {
          throw new Error("List module shoult not throw an error")
        }
      })

      it('should replace archivation date in the found list when the list is found', () => {
        listModule.lists = [list2, list1]

        listModule.setArchivationDate(archivationPayload)

        expect(listModule.lists).toHaveLength(2)
        expect(listModule.lists[0].archivationDate).toBeUndefined()
        expect(listModule.lists[1].archivationDate).toEqual(archivationDate)
      })
    })

    describe('setSelectedListArchivationDate', () => {
      it('should not throw an error when there is no selected list', () => {
        try {
          listModule.setSelectedListArchivationDate(archivationDate)
        } catch(err) {
          throw new Error('List module should not throw an error')
        }
      })

      it('should set archivation date into selected list', ( ) => {
        listModule.selectedList = selectedList

        listModule.setSelectedListArchivationDate(archivationDate)

        expect(listModule.selectedList.archivationDate).toEqual(archivationDate)
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

  describe('Action', () => {
    describe('create', () => {
      const newCreationDate = 'new-creation-date'
      const newList: List = {
        id: 'new-id',
        name: newName,
        creationDate: newCreationDate
      };

      (createList as jest.Mock).mockResolvedValue(newList)

      it('should call api to create a new list', async () => {
        await listModule.create(newName)

        expect(createList).toHaveBeenCalledTimes(1)
        expect(createList).toHaveBeenCalledWith(newName)
      })

      it('should return created list', async () => {
        const result = await listModule.create(newName)

        expect(result).toEqual(newList)
      })
    })

    describe('getUsers', () => {
      (getUsersLists as jest.Mock).mockResolvedValue([list1, list2])

      it('should call api to get user\'s lists', async () => {
        await listModule.getUsers()

        expect(getUsersLists).toHaveBeenCalledTimes(1)
      })

      it('should return user\'s lists', async () => {
        const result = await listModule.getUsers()

        expect(result).toEqual([list1, list2])
      })
    })

    describe('deleteAction', () => {
      (deleteList as jest.Mock).mockResolvedValue({})

      it('should call api to delete list', async () => {
        await listModule.deleteAction(id1)

        expect(deleteList).toHaveBeenCalledTimes(1)
      })

      it('should return list id', async () => {
        const result = await listModule.deleteAction(id1)

        expect(result).toBe(id1)
      })
    })

    describe('addProductAction', () => {
      (addProductToList as jest.Mock).mockResolvedValue(undefined)

      it('should do nothing when no list has been selected', async () => {
        await listModule.addProductAction(product)

        expect(addProductToList).not.toHaveBeenCalled()
      })

      it('should call api to add product in list', async () => {
        listModule.selectedList = selectedList

        await listModule.addProductAction(product)

        expect(addProductToList).toHaveBeenCalledTimes(1)
        expect(addProductToList).toHaveBeenCalledWith(product.id, selectedList.id)
      })

      it('should return new product in selected list', async () => {
        listModule.selectedList = selectedList

        const result = await listModule.addProductAction(product)

        const expectedProductInList: ProductInSelectedList = {
          ...product,
          buyed: false
        }
        expect(result).toEqual(expectedProductInList)
      })
    })

    describe('deleteProductAction', () => {
      (deleteProductInList as jest.Mock).mockResolvedValue({})

      it('should do nothing when no list has been selected', async () => {
        await listModule.deleteProductAction(productWithCategoryInSelectedList)

        expect(deleteProductInList).not.toHaveBeenCalled()
      })

      it('should call api to delete product in list', async () => {
        listModule.selectedList = selectedList

        await listModule.deleteProductAction(productWithCategoryInSelectedList)

        expect(deleteProductInList).toHaveBeenCalledTimes(1)
        expect(deleteProductInList).toHaveBeenCalledWith(productWithCategoryInSelectedList.id, selectedList.id)
      })

      it('should return the deleted product', async () => {
        listModule.selectedList = selectedList

        const result = await listModule.deleteProductAction(productWithCategoryInSelectedList)

        expect(result).toEqual(productWithCategoryInSelectedList)
      })
    })

    describe('selectList', () => {
      (readList as jest.Mock).mockResolvedValue(selectedList)

      it('should call api to retrieve the wanted list with their categories and products', async () => {
        await listModule.selectList(id1)

        expect(readList).toHaveBeenCalledTimes(1)
        expect(readList).toHaveBeenCalledWith(id1)
      })

      it('should return the selected list wrapped in an object', async () => {
        const result = await listModule.selectList(id1)

        expect(result).toEqual({ selectedList })
      })
    })

    describe('archiveList', () => {
      const archivedList: List = {
        ...selectedList,
        archivationDate
      };
      (archiveList as jest.Mock).mockResolvedValue(archivedList)

      it('should do nothing when list is not found in state', async () => {
        await listModule.archiveList(id1)

        expect(archiveList).not.toHaveBeenCalled()
      })

      it('should call api to archive the list', async () => {
        listModule.lists = [list2, list1]

        await listModule.archiveList(id1)

        expect(archiveList).toHaveReturnedTimes(1)
        expect(archiveList).toHaveBeenCalledWith(id1)
      })

      it('should set the archivation date in the selected list when there is a selected list and it has the same id', async () => {
        listModule.lists = [list2, list1]
        const selectedListWithSameId = {
          ...selectedList,
          id: id1
        }
        listModule.selectedList = selectedListWithSameId
        listModule.setSelectedListArchivationDate = jest.fn()

        await listModule.archiveList(id1)

        expect(listModule.setSelectedListArchivationDate).toHaveBeenCalledWith(archivationDate)
      })

      it('should set the archivation date in the lists', async () => {
        listModule.lists = [list2, list1]

        listModule.setArchivationDate = jest.fn()

        await listModule.archiveList(id1)

        expect(listModule.setArchivationDate).toHaveBeenCalledWith({ listID: id1, archivationDate})
      })
    })
  })
})

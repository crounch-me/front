import { ListModule } from './ListModule';
import { List } from '@/models/list'

describe('ListModule', () => {
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
  const unknownId = 'unknown-id'
  let listModule: ListModule

  beforeEach(() => {
    listModule = new ListModule(ListModule)
  })

  it('Should initialize the module with an empty list array', () => {
    expect(listModule.lists).toEqual([])
  })

  describe('all', () => {
    it('should return the lists array', () => {
      listModule.lists.push(list1)
      listModule.lists.push(list2)

      const result = listModule.all

      expect(result).toHaveLength(2)
      expect(result[0]).toBe(list1)
      expect(result[1]).toBe(list2)
    })
  })

  describe('one', () => {
    it('should return the list is in state', () => {
      listModule.lists.push(list1)
      listModule.lists.push(list2)

      const result = listModule.one(id2)

      expect(result).toBe(list2)
    })

    it('should return undefined when the list is not in state', () => {
      listModule.lists.push(list1)
      listModule.lists.push(list2)

      const result = listModule.one(unknownId)

      expect(result).toBeUndefined()
    })
  })

  describe('add', () => {
    it('should add the list to the state', () => {
      listModule.lists.push(list1)

      listModule.add(list2)

      expect(listModule.lists).toHaveLength(2)
      expect(listModule.lists[0]).toBe(list1)
      expect(listModule.lists[1]).toBe(list2)
    })
  })

  describe('set', () => {
    it('should replace the lists in state with the lists', () => {
      listModule.lists.push(list1)

      listModule.set([list2])

      expect(listModule.lists).toHaveLength(1)
      expect(listModule.lists[0]).toBe(list2)
    })
  })

  describe('delete', () => {
    it('should delete the list in the state', () => {
      listModule.lists.push(list1)
      listModule.lists.push(list2)

      listModule.delete(id2)

      expect(listModule.lists).toHaveLength(1)
      expect(listModule.lists[0]).toBe(list1)
    })
  })

  describe('reset', () => {
    it('should reset the lists state to an empty array', () => {
      listModule.lists.push(list1)

      listModule.reset()

      expect(listModule.lists).toEqual([])
    })
  })
})

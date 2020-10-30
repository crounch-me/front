import store from '.'
import { createList, deleteList, getOwnerLists } from '@/api/list';
import { List } from '@/models/list'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ dynamic: true, store, name: 'list' })
export class ListModule extends VuexModule {
  lists: List[] = []

  get all() {
    return this.lists
  }

  get one() {
    return (id: string) => this.lists.find(list => list.id === id)
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
  delete(id: string) {
    this.lists = this.lists.filter(list => list.id !== id)
  }

  @Mutation
  reset() {
    this.lists = []
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
}

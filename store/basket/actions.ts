import { StoreBasket } from '@/internal/basket/adapters/store'

export default {
  save ({ commit }: any, { basket } : { basket: StoreBasket }): void {
    commit('save', { basket })
  }
}

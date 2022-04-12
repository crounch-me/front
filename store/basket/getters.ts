import { StoreBasket } from '@/internal/basket/adapters/store'
import { State } from '@/store/basket/state'

export default {
  get: (state: State): StoreBasket => {
    return state.basket
  }
}

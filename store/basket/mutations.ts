import { State } from '@/store/basket/state'
import { StoreBasket } from '@/internal/basket/adapters/store'

export default {
  save (state: State, { basket }: { basket: StoreBasket }): void {
    state.basket = basket
  }
}

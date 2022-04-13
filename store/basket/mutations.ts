import { State } from '@/store/basket/state'
import { BasketData } from '@/internal/basket/adapters/store'

export default {
  save (state: State, { basket }: { basket: BasketData }): void {
    state.basket = basket
  }
}

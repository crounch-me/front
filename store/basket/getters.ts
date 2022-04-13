import { BasketData } from '@/internal/basket/adapters/store'
import { State } from '@/store/basket/state'

export default {
  get: (state: State): BasketData => {
    return state.basket
  }
}

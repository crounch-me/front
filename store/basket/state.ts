import { StoreBasket } from '@/internal/basket/adapters/store'

export interface State {
  basket: StoreBasket
}

export default () => {
  const initialState: State = {
    basket: {
      articles: []
    }
  }

  return initialState
}

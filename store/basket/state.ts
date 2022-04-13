import { BasketData } from '@/internal/basket/adapters/store'

export interface State {
  basket: BasketData
}

export default () => {
  const initialState: State = {
    basket: {
      articles: []
    }
  }

  return initialState
}

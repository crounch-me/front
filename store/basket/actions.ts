import { BasketData } from '@/internal/basket/adapters/store'
import { BasketStoreKeys } from '@/store/basket/keys'

export default {
  save ({ commit }: any, { basket } : { basket: BasketData }): void {
    commit(BasketStoreKeys.mutations.save, { basket })
  }
}

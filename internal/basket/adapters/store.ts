import { Store } from 'vuex'
import { Basket } from '@/internal/basket/entity'
import { BasketRepository } from '@/internal/basket/repository'
import { ArticleData } from '@/internal/article/data'
import { BasketStoreKeys, formatBasketStoreKey } from '@/store/basket/keys'

export interface BasketData {
  articles: ArticleData[]
}

export class BasketStoreRepository implements BasketRepository {
  private store: Store<BasketData>
  private static instance: BasketStoreRepository

  public constructor (store: Store<BasketData>) {
    this.store = store
  }

  public static getInstance (store: Store<BasketData>): BasketStoreRepository {
    if (!this.instance) {
      this.instance = new BasketStoreRepository(store)
    }

    return this.instance
  }

  public save (basket: Basket) {
    const basketData: BasketData = {
      ...basket
    }

    this.store.dispatch(formatBasketStoreKey(BasketStoreKeys.actions.save), { basket: basketData })
  }
}

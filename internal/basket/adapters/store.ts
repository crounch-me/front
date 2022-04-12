import { StoreArticle } from '@/internal/article/entity'
import { Basket } from '@/internal/basket/entity'
import { BasketRepository } from '@/internal/basket/repository'

export interface StoreBasket {
  articles: StoreArticle[]
}

export class StoreBasketRepository implements BasketRepository {
  private store: any
  private static instance: StoreBasketRepository

  public constructor (store: any) {
    this.store = store
  }

  public static getInstance (store: any): StoreBasketRepository {
    if (!this.instance) {
      this.instance = new StoreBasketRepository(store)
    }

    return this.instance
  }

  public save (basket: Basket) {
    const storeBasket: StoreBasket = {
      ...basket
    }

    this.store.dispatch('basket/save', { basket: storeBasket })
  }
}

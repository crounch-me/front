import { StoreArticle } from '@/internal/article/entity'
import { BasketBuilder } from '@/internal/basket/builder'
import { StoreBasket, StoreBasketRepository } from '@/internal/basket/adapters/store'

export class BasketHandler {
  public static addArticle (store: StoreBasketRepository, storeBasket: StoreBasket, article: StoreArticle): void {
    const basket = BasketBuilder.fromStoreBasket(storeBasket)

    basket.addArticle(article)

    store.save(basket)
  }
}

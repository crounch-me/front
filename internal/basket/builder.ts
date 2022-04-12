import { ArticleBuilder } from '@/internal/article/builder'
import { Basket } from '@/internal/basket/entity'
import { StoreBasket } from '@/internal/basket/adapters/store'

export class BasketBuilder {
  public static fromStoreBasket (storeBasket: StoreBasket): Basket {
    const basket = new Basket()

    basket.articles = storeBasket.articles.map(ArticleBuilder.fromStoreArticle)

    return basket
  }
}

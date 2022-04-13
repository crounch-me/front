import { ArticleBuilder } from '@/internal/article/builder'
import { Basket } from '@/internal/basket/entity'
import { BasketData } from '@/internal/basket/adapters/store'

export class BasketBuilder {
  public static fromBasketData (basketData: BasketData): Basket {
    const basket = new Basket()

    basket.articles = basketData.articles.map(ArticleBuilder.fromArticleData)

    return basket
  }
}

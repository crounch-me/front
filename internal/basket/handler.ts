import { BasketBuilder } from '@/internal/basket/builder'
import { BasketData } from '@/internal/basket/adapters/store'
import { BasketRepository } from '@/internal/basket/repository'
import { ArticleData } from '@/internal/article/data'

export class BasketHandler {
  private basketRepository: BasketRepository

  public constructor (
    basketRepository: BasketRepository
  ) {
    this.basketRepository = basketRepository
  }

  public addArticle (basketData: BasketData, article: ArticleData): void {
    const basket = BasketBuilder.fromBasketData(basketData)

    basket.addArticle(article)

    this.basketRepository.save(basket)
  }

  public removeArticle (basketData: BasketData, article: ArticleData): void {
    const basket = BasketBuilder.fromBasketData(basketData)

    basket.removeArticle(article)

    this.basketRepository.save(basket)
  }
}

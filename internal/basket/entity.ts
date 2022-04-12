import { Article } from '@/internal/article/entity'

export class Basket {
  public articles: Article[]

  public constructor () {
    this.articles = []
  }

  public addArticle (article: Article): void {
    if (this.containsArticle(article)) {
      throw new Error('basket already contains article')
    }

    this.articles.push(article)
  }

  private containsArticle (article: Article): boolean {
    return this.articles.some(a => a.id === article.id)
  }
}

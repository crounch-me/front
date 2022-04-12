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

  public removeArticle (article: Article): void {
    const newArticles = this.articles.filter(a => a.id !== article.id)

    if (newArticles.length === this.articles.length) {
      throw new Error('article not found in basket')
    }

    this.articles = newArticles
  }

  private containsArticle (article: Article): boolean {
    return this.articles.some(a => a.id === article.id)
  }
}

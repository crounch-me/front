import { Article, StoreArticle } from '@/internal/article/entity'

export class ArticleBuilder {
  public static fromStoreArticle (storeArticle: StoreArticle): Article {
    return new Article(storeArticle.id, storeArticle.label)
  }
}

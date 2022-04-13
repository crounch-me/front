import { ArticleData } from '@/internal/article/data'
import { Article } from '@/internal/article/entity'

export class ArticleBuilder {
  public static fromArticleData (articleData: ArticleData): Article {
    return new Article(articleData.id, articleData.label)
  }
}

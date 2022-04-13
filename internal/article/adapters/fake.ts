import { ArticleData } from '@/internal/article/data'
import { get } from '@/internal/shared/api'

export class ArticleFakeData {
  static async fetchArticles (): Promise<ArticleData[]> {
    return (await get('https://my-json-server.typicode.com/crounch-me/front/articles')) ?? []
  }
}

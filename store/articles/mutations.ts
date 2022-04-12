import { StoreArticle } from '@/internal/article/entity'
import { State } from '@/store/articles/state'

export default {
  initArticles (state: State, { articles } : { articles: StoreArticle[] }): void {
    state.articles = articles
  }
}

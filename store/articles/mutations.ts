import { ArticleData } from '@/internal/article/data'
import { ArticleStoreKeys } from '@/store/articles/keys'
import { State } from '@/store/articles/state'

export default {
  [ArticleStoreKeys.mutations.init] (state: State, { articles } : { articles: ArticleData[] }): void {
    state.articles = articles
  }
}

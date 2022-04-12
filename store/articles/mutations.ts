import { Article } from '@/internal/article'
import { State } from '@/store/articles/state'

export default {
  initArticles (state: State, { articles } : { articles: Article[] }) {
    state.articles = articles
  }
}

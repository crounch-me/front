import { StoreArticle } from '@/internal/article/entity'
import { State } from '@/store/articles/state'

export default {
  all: (state: State): StoreArticle[] => {
    return state.articles
  }
}

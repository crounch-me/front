import { ArticleData } from '@/internal/article/data'
import { ArticleStoreKeys } from '@/store/articles/keys'
import { State } from '@/store/articles/state'

export default {
  [ArticleStoreKeys.getters.all]: (state: State): ArticleData[] => {
    return state.articles
  }
}

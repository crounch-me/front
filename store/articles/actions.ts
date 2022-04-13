import { ArticleFakeData } from '@/internal/article/adapters/fake'
import { ArticleStoreKeys } from '@/store/articles/keys'

export default {
  async [ArticleStoreKeys.actions.init] ({ commit }: any): Promise<void> {
    const articles = await ArticleFakeData.fetchArticles()

    if (articles) {
      commit(ArticleStoreKeys.mutations.init, { articles })
    }
  }
}

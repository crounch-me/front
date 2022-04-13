import { get } from '@/internal/api'
import { ArticleStoreKeys } from '@/store/articles/keys'

export default {
  async [ArticleStoreKeys.actions.init] ({ commit }: any): Promise<void> {
    const articles = await get('https://my-json-server.typicode.com/crounch-me/front/articles')

    if (articles) {
      commit(ArticleStoreKeys.mutations.init, { articles })
    }
  }
}

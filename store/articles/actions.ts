import { get } from '@/internal/api'

export default {
  async init ({ commit }: any): Promise<void> {
    const articles = await get('https://my-json-server.typicode.com/crounch-me/front/articles')

    if (articles) {
      commit('initArticles', { articles })
    }
  }
}

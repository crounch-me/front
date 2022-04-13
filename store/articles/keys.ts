export const ArticleStoreKeys = {
  actions: {
    init: 'init'
  },
  getters: {
    all: 'all'
  },
  mutations: {
    init: 'init'
  }
}

export function formatArticleStoreKey (key: string) {
  return `articles/${key}`
}

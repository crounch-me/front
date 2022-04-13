export const BasketStoreKeys = {
  actions: {
    save: 'save'
  },
  getters: {
    get: 'get'
  },
  mutations: {
    save: 'save'
  }
}

export function formatBasketStoreKey (key: string) {
  return `basket/${key}`
}

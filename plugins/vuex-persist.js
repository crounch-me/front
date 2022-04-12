import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  const enableVuexPersist = false
  if (enableVuexPersist) {
    new VuexPersistence({
      key: 'crounch'
    }).plugin(store)
  }
}

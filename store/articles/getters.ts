import { State } from '@/store/articles/state'

export default {
  all: (state: State) => {
    return state.articles
  }
}

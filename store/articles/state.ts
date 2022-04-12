import { StoreArticle } from '@/internal/article/entity'

export interface State {
  articles: StoreArticle[]
}

const initialState: State = {
  articles: []
}

export default () => initialState

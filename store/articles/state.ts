import { Article } from '@/internal/article'

export interface State {
  articles: Article[]
}

const initialState: State = {
  articles: []
}

export default () => initialState

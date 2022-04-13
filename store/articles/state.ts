import { ArticleData } from '@/internal/article/data'

export interface State {
  articles: ArticleData[]
}

const initialState: State = {
  articles: []
}

export default () => initialState

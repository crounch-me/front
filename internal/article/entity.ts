export interface StoreArticle {
  id: number
  label: string
}

export class Article {
  public id: number
  public label: string

  public constructor (
    id: number,
    label: string
  ) {
    this.id = id
    this.label = label
  }
}

export abstract class Api {
  protected abstract BASE_URL: string

  public computeUrl(path: string): string {
    return `${this.BASE_URL}/${path}`
  }
}

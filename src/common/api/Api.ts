import { doFetch } from '../../api/doFetch'

export abstract class Api {
  protected abstract BASE_URL: string

  public computePath(path: string): string {
    const realPath = path === '' ? '' : `/${path}`
    return `${this.BASE_URL}${realPath}`
  }

  public post<T>(path: string, data?: object): Promise<T> {
    const realPath = this.computePath(path)

    const fetchOptions = {
      path: realPath,
      data,
      method: 'POST'
    }

    return doFetch(fetchOptions)
  }
}

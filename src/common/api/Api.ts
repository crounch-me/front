import { getModule } from 'vuex-module-decorators'
import { AccountModule } from '../../account/store/AccountModule'
import { FetchOptions } from '../../api/doFetch'
import router from '../../router/router'
import { TOKEN_STORAGE_KEY } from '../../utils/constants'
import { getAPIURL } from '../../utils/environment'
import { FetchError } from '../../utils/error'

export abstract class Api {
  protected abstract BASE_URL: string

  public computeUrl(path: string): string {
    const realPath = path === '' ? '' : `/${path}`
    return `${this.BASE_URL}${realPath}`
  }

  public post<T>(path: string, data?: object): Promise<T> {
    const fetchOptions = {
      path,
      data,
      method: 'POST'
    }

    return this.doFetch(fetchOptions)
  }

  public doFetch<T>(options: FetchOptions): Promise<T> {
    const pathUrl = this.computeUrl(options.path)
    const finalUrl = this.getFinalUrl(pathUrl)

    return fetch(finalUrl, this.getFetchOptions(options))
      .then(res => {
        if (res.status >= 200 && res.status <= 299 && res.status !== 204) {
          return res.json().then(data => data.data)
        }
        if (res.status === 204) {
          return
        }
        if (res.status === 401) {
          const accountModule = getModule(AccountModule)
          accountModule.logoutAction().then(() => {
            router.push({ name: 'home' })
          })
        }

        return res.json()
          .then(body => { throw new FetchError('Erreur lors de la requête', res.status, body) })
          .catch()
      })
  }

  private getFetchOptions({ data, method }: FetchOptions): object {
    let options: any = {
      method,
      headers: {
        Authorization: localStorage.getItem(TOKEN_STORAGE_KEY),
      },
    };

    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }

    return options;
  }

  private getFinalUrl(url: string): string {
    return `${getAPIURL()}/${url}`;
  }
}

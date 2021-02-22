import { getModule } from 'vuex-module-decorators'

import router from '@/router/router'
import { AccountModule } from '@/account/store/AccountModule'
import { TOKEN_STORAGE_KEY } from '@/utils/constants'
import { getAPIURL } from '@/utils/environment'
import { FetchError } from '@/utils/error'

export interface FetchOptions {
  path: string;
  data?: object;
  method: string;
}

export function doFetch<T>(options: FetchOptions): Promise<T> {
  return fetch(getUrl(options.path), getFetchOptions(options))
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

function getFetchOptions({ data, method }: FetchOptions): object {
  let options: any = {
    method,
    headers: {
      Authorization: localStorage.getItem(TOKEN_STORAGE_KEY),
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  return options;
}

function getUrl(url: string): string {
  return `${getAPIURL()}/${url}`;
}

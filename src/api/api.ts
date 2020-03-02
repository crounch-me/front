import { getAPIURL } from '@/utils/environment';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { FetchError } from '@/utils/error';

export interface FetchOptions {
  url: string;
  data?: object;
  method: string;
}

export function doFetch<T>(options: FetchOptions): Promise<T> {
  return fetch(getUrl(options.url), getFetchOptions(options))
    .then(res => {
      if (res.status >= 200 && res.status <= 299) {
        return res.json()
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

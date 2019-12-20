import { getAPIURL } from '@/utils/environment';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';

export interface FetchOptions {
  url: string;
  data?: object;
  method: string;
}

export function doFetch<T>(options: FetchOptions): Promise<T> {
  return fetch(getUrl(options.url), getFetchOptions(options))
    .then(res => res.json())
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

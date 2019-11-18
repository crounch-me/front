import { api } from './api';

export const unauthorizedInterceptor = (logout: any) => (err: any): Promise<void> => {
  if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    logout();
  }
  return Promise.reject(err);
};

export function addUnauthorizedInterceptor(logout: any) {
  api.interceptors.response.use(undefined, unauthorizedInterceptor(logout));
}

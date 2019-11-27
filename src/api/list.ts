import { api } from './api';

export function createList(name: string) {
  return api
    .post('lists', { name })
    .then(res => res.data);
}

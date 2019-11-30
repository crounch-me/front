import { api } from './api';
import { List } from '@/models/list';

export function createList(name: string): Promise<List> {
  return api
    .post('lists', { name })
    .then(res => res.data);
}

export function getOwnerLists(): Promise<Array<List>> {
  return api
    .get('lists')
    .then(res => res.data);
}

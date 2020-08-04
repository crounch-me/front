import { doFetch } from './api';
import { List } from '@/models/list';

export function createList(name: string): Promise<List> {
  return doFetch({
    url: 'lists',
    method: 'POST',
    data: { name }
  });
}

export function getOwnerLists(): Promise<Array<List>> {
  return doFetch({
    url: 'lists',
    method: 'GET',
  });
}

export function deleteList(id: string): Promise<void> {
  return doFetch({
    url: `lists/${id}`,
    method: 'DELETE',
  });
}

export function addProductToList(productID: string, listID: string): Promise<void> {
  return doFetch({
    url: `lists/${listID}/products/${productID}`,
    method: 'POST'
  })
}

export function readList(listID: string): Promise<List> {
  return doFetch({
    url: `lists/${listID}`,
    method: 'GET'
  })
}

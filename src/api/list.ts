import { doFetch } from './api';
import { SelectedList, List } from '@/models/list';

export function createList(name: string): Promise<List> {
  return doFetch({
    url: 'lists',
    method: 'POST',
    data: { name }
  });
}

export function getUsersLists(): Promise<Array<List>> {
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

export function deleteProductInList(productID: string, listID: string): Promise<void> {
  return doFetch({
    url: `lists/${listID}/products/${productID}`,
    method: 'DELETE'
  })
}

export function archiveList(listID: string): Promise<SelectedList> {
  return doFetch({
    url: `lists/${listID}/archive`,
    method: 'POST'
  })
}

export function readList(listID: string): Promise<SelectedList> {
  return doFetch({
    url: `lists/${listID}`,
    method: 'GET'
  })
}

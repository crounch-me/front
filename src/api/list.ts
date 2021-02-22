import { doFetch } from './doFetch';
import { SelectedList, List } from '@/models/list';

export function createList(name: string): Promise<List> {
  return doFetch({
    path: 'lists',
    method: 'POST',
    data: { name }
  });
}

export function getUsersLists(): Promise<Array<List>> {
  return doFetch({
    path: 'lists',
    method: 'GET',
  });
}

export function deleteList(id: string): Promise<void> {
  return doFetch({
    path: `lists/${id}`,
    method: 'DELETE',
  });
}

export function addProductToList(productID: string, listID: string): Promise<void> {
  return doFetch({
    path: `lists/${listID}/products/${productID}`,
    method: 'POST'
  })
}

export function deleteProductInList(productID: string, listID: string): Promise<void> {
  return doFetch({
    path: `lists/${listID}/products/${productID}`,
    method: 'DELETE'
  })
}

export function archiveList(listID: string): Promise<SelectedList> {
  return doFetch({
    path: `lists/${listID}/archive`,
    method: 'POST'
  })
}

export function setBoughtProductInList(productID: string, listID: string, bought: boolean): Promise<void> {
  return doFetch({
    path: `lists/${listID}/products/${productID}`,
    method: 'PATCH',
    data: {
      bought
    }
  })
}

export function readList(listID: string): Promise<SelectedList> {
  return doFetch({
    path: `lists/${listID}`,
    method: 'GET'
  })
}

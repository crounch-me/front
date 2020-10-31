import { doFetch, FetchOptions } from './api';
import { createList, getOwnerLists, deleteList, addProductToList, readList, deleteProductInList } from './list';
import { List } from '@/models/list';
import { when } from 'jest-when';

jest.mock('./api');

describe('List API', () => {
  const name = 'shopping';
  const listID = 'list id';
  const productID = 'product ID'
  const list: List = {
    id: listID,
    name,
    products: []
  };
  const lists: List[] = [list];
  const expectedCreateOptions: FetchOptions = {
    url: 'lists',
    method: 'POST',
    data: {
      name
    }
  };

  const expectedGetOptions: FetchOptions = {
    url: 'lists',
    method: 'GET'
  };

  const expectedDeleteListOptions: FetchOptions = {
    url: `lists/${listID}`,
    method: 'DELETE',
  }

  const expectedDeleteProductFromListOptions: FetchOptions = {
    url: `lists/${listID}/products/${productID}`,
    method: 'DELETE',
  }

  const expectedAddProductToListOptions: FetchOptions = {
    url: `lists/${listID}/products/${productID}`,
    method: 'POST'
  }

  const expectedReadListOptions: FetchOptions = {
    url: `lists/${listID}`,
    method: 'GET'
  }

  beforeEach(() => {
    (doFetch as jest.Mock).mockClear();
    when(doFetch as jest.Mock).calledWith(expectedCreateOptions).mockResolvedValue(list);
    when(doFetch as jest.Mock).calledWith(expectedGetOptions).mockResolvedValue([list]);
    when(doFetch as jest.Mock).calledWith(expectedDeleteListOptions).mockResolvedValue({});
    when(doFetch as jest.Mock).calledWith(expectedAddProductToListOptions).mockResolvedValue({})
    when(doFetch as jest.Mock).calledWith(expectedReadListOptions).mockResolvedValue(list)
    when(doFetch as jest.Mock).calledWith(expectedDeleteProductFromListOptions).mockResolvedValue({})
  });

  describe('createList', () => {
    it('Should call create list endpoint with right parameters.', done => {
      createList(name).then(() => {
        expect(doFetch).toHaveBeenCalledWith(expectedCreateOptions);
        done();
      });
    });

    it('Should return list from the endpoint.', done => {
      createList(name).then(res => {
        expect(res).toEqual(list)
        done();
      });
    });
  });

  describe('getOwnerLists', () => {
    it('Should call get lists endpoint with right parameters.', done => {
      getOwnerLists().then(() => {
        expect(doFetch).toHaveBeenCalledWith(expectedGetOptions);
        done();
      });
    });

    it('Should return lists from the endpoint.', done => {
      getOwnerLists().then(res => {
        expect(res).toEqual(lists);
        done();
      });
    });
  });

  describe('deleteList', () => {
    it('Should call delete list endpoint with right parameters.', done => {
      deleteList(listID).then(() => {
        expect(doFetch).toHaveBeenCalledWith(expectedDeleteListOptions);
        done();
      });
    });
  });

  describe('addProductToList', () => {
    it('Should call add product to list with the right parameters', done => {
      addProductToList(productID, listID).then(() => {
        expect(doFetch).toHaveBeenCalledWith(expectedAddProductToListOptions)
        done()
      })
    })
  })

  describe('deleteProductInList', () => {
    it('Should call delete product from list endpoint with right parameters.', done => {
      deleteProductInList(productID, listID).then(() => {
        expect(doFetch).toHaveBeenCalledWith(expectedDeleteProductFromListOptions);
        done();
      });
    });
  });

  describe('readList', () => {
    it('Should call add product to list with the right parameters', done => {
      readList(listID).then(resultList => {
        expect(doFetch).toHaveBeenCalledWith(expectedReadListOptions)
        expect(resultList).toEqual(list)
        done()
      })
    })
  })
});

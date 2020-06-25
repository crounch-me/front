import { doFetch, FetchOptions } from './api';
import { createList, getOwnerLists, deleteList } from './list';
import { List } from '@/models/list';
import { when } from 'jest-when';

jest.mock('./api');

describe('List API', () => {
  const name = 'shopping';
  const listId = 'list id';
  const list: List = {
    id: listId,
    name,
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

  const expectedDeleteOptions: FetchOptions = {
    url: `lists/${listId}`,
    method: 'DELETE',
  }

  beforeEach(() => {
    (doFetch as jest.Mock).mockClear();
    when(doFetch as jest.Mock).calledWith(expectedCreateOptions).mockResolvedValue(list);
    when(doFetch as jest.Mock).calledWith(expectedGetOptions).mockResolvedValue([list]);
    when(doFetch as jest.Mock).calledWith(expectedDeleteOptions).mockResolvedValue({});
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
      deleteList(listId).then(_ => {
        expect(doFetch).toHaveBeenCalledWith(expectedDeleteOptions);
        done();
      });
    });
  });
});

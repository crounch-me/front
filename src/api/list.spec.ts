import { api } from './api';
import { createList, getOwnerLists } from './list';
import { List } from '@/models/list';

jest.mock('./api', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('List API', () => {
  const name = 'shopping';
  const list: List = {
    id: 'list id',
    name,
  };
  const lists: List[] = [list];

  beforeEach(() => {
    (api.post as jest.Mock).mockClear();
    (api.post as jest.Mock).mockResolvedValue({ data: list });
    (api.get as jest.Mock).mockClear();
    (api.get as jest.Mock).mockResolvedValue({ data: lists });
  });

  describe('createList', () => {
    it('Should call create list endpoint with right parameters.', done => {
      createList(name).then(() => {
        expect(api.post).toHaveBeenCalledWith('lists', { name });
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
        expect(api.get).toHaveBeenCalledWith('lists');
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
});

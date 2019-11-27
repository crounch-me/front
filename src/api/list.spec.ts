import { api } from './api';
import { createList } from './list';

jest.mock('./api', () => ({
  api: {
    post: jest.fn(),
  },
}));

describe('List API', () => {
  const name = 'shopping';
  const list = {
    id: 'list id',
    name,
  };

  beforeEach(() => {
    (api.post as jest.Mock).mockClear();
    (api.post as jest.Mock).mockResolvedValue({ data: list });
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
});

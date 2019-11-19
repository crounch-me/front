import { api } from './api';
import { signup, login } from './user';

jest.mock('./api', () => ({
  api: {
    post: jest.fn(),
  },
}));

describe('User API', () => {
  const email = 'hello';
  const password = 'world';

  beforeEach(() => {
    (api.post as jest.Mock).mockClear();
    (api.post as jest.Mock).mockReturnValue(Promise.resolve({}));
  });

  describe('signup', () => {
    it('Should call signup endpoint with right parameters.', () => {
      signup(email, password);

      expect(api.post).toHaveBeenCalledWith('users', { email, password });
    });
  });

  describe('login', () => {
    it('Should call login endpoint with right parameters.', () => {
      login(email, password);

      expect(api.post).toHaveBeenCalledWith('users/login', { email, password });
    });
  });
});

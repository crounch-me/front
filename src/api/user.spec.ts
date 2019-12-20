import { doFetch } from './api';
import { signup, login } from './user';

jest.mock('./api');

describe('User API', () => {
  const email = 'hello';
  const password = 'world';

  beforeEach(() => {
    (doFetch as jest.Mock).mockClear();
    (doFetch as jest.Mock).mockResolvedValue({});
  });

  describe('signup', () => {
    it('Should call signup endpoint with right parameters.', () => {
      signup(email, password);

      expect(doFetch).toHaveBeenCalledWith({
        url: 'users',
        method: 'POST',
        data: {
          email,
          password
        }
      });
    });
  });

  describe('login', () => {
    it('Should call login endpoint with right parameters.', () => {
      login(email, password);

      expect(doFetch).toHaveBeenCalledWith({
        url: 'users/login',
        method: 'POST',
        data: { email, password }
      });
    });
  });
});

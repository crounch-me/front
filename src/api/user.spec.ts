import { doFetch } from './doFetch';
import { signup, login, logout } from './user';

jest.mock('./doFetch');

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
        path: 'users',
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
        path: 'users/login',
        method: 'POST',
        data: { email, password }
      });
    });
  });

  describe('logout', () => {
    it('Should call logout endpoint.', () => {
      logout();

      expect(doFetch).toHaveBeenCalledWith({
        path: 'logout',
        method: 'POST',
      });
    });
  });
});

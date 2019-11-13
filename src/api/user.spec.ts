import axios from 'axios';

import { signup } from './user';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('User API', () => {

  beforeEach(() => {
    (axios.post as jest.Mock).mockClear();
    (axios.post as jest.Mock).mockReturnValue(Promise.resolve({}));
  });

  describe('signup', () => {
    it('Should call API with right parameters.', () => {
      const email = 'hello';
      const password = 'world';
      signup(email, password);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users', { email, password });
    });
  });
});

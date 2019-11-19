import { mutations } from './mutations';
import { AuthKeys } from './keys';

describe('Mutations', () => {
  const token = 'user token';
  describe('LOGIN', () => {
    it('Should set token to given token.', () => {
      const state = { token: '', status: '' };

      mutations[AuthKeys.LOGIN](state, token);

      expect(state.token).toBe(token);
    });
  });

  describe('LOGOUT', () => {
    it('Should set token to empty string.', () => {
      const state = { token, status: '' };

      mutations[AuthKeys.LOGOUT](state);

      expect(state.token).toBe('');
    });
  });
});

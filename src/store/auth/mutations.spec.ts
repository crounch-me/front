import { mutations } from './mutations';
import { AuthMutations } from './keys';

describe('Mutations', () => {
  const token = 'user token';
  describe('LOGIN', () => {
    it('Should set token to given token.', () => {
      const state = { token: '', status: '' };

      mutations[AuthMutations.LOGIN](state, token);

      expect(state.token).toBe(token);
    });
  });

  describe('LOGOUT', () => {
    it('Should set token to empty string.', () => {
      const state = { token, status: '' };

      mutations[AuthMutations.LOGOUT](state);

      expect(state.token).toBe('');
    });
  });
});

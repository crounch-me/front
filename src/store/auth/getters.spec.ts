import { AuthState } from '.';
import { getters } from './getters';

describe('Getters', () => {
  const token = 'user token';
  const emptyRootState = { dummy: '' };

  describe('isAuthenticated', () => {
    it('Should return true if token is defined.', () => {
      const state: AuthState = {
        token,
        status: '',
      };

      const result = getters.isAuthenticated(state, { getters }, emptyRootState, {});

      expect(result).toBeTruthy();
    });

    it('Should return false if token is not defined.', () => {
      const state: AuthState = {
        token: '',
        status: '',
      };

      const result = getters.isAuthenticated(state, { getters }, emptyRootState, {});

      expect(result).toBeFalsy();
    });
  });
});

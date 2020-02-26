import { AuthState } from '.';
import { getters } from './getters';
import { AuthGetters } from './keys';

describe('Getters', () => {
  const token = 'user token';
  const emptyRootState = { dummy: '' };

  describe('isAuthenticated', () => {
    it('Should return true if token is defined.', () => {
      const state: AuthState = {
        token,
        status: '',
      };

      const result = getters[AuthGetters.IS_AUTHENTICATED](state, undefined, emptyRootState, {});

      expect(result).toBeTruthy();
    });

    it('Should return false if token is not defined.', () => {
      const state: AuthState = {
        token: '',
        status: '',
      };

      const result = getters[AuthGetters.IS_AUTHENTICATED](state, undefined, emptyRootState, {});

      expect(result).toBeFalsy();
    });
  });
});

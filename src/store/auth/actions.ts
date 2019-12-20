import { ActionTree } from 'vuex';
import { AuthState } from '.';
import { RootState } from '..';
import { login, signup } from '@/api/user';
import { AuthActions, AuthMutations } from './keys';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';

export const actions: ActionTree<AuthState, RootState> = {
  [AuthActions.LOGIN]: ({ commit }, { email, password }): Promise<void> => {
    return login(email, password)
      .then(res => {
        const token = res.accessToken;
        commit(AuthMutations.LOGIN, token);
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
        return Promise.resolve();
      })
      .catch(err => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        return Promise.reject(err);
      });
  },
  [AuthActions.SIGNUP]: ({ dispatch }, { email, password }): Promise<void> => {
    return signup(email, password)
      .then(() => {
        dispatch(AuthActions.LOGIN, { email, password });
        return Promise.resolve();
      })
      .catch(Promise.reject);
  },
  [AuthActions.LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AuthMutations.LOGOUT);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      resolve();
    });
  },
};

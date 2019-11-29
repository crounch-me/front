import { ActionTree } from 'vuex';
import { AuthState } from '.';
import { RootState } from '..';
import { login, signup } from '@/api/user';
import { AuthKeys } from './keys';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { api } from '@/api/api';

export const actions: ActionTree<AuthState, RootState> = {
  [AuthKeys.LOGIN]: ({ commit }, { email, password }): Promise<void> => {
    return login(email, password)
      .then(res => {
        const token = res.accessToken;
        commit(AuthKeys.LOGIN, token);
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
        api.defaults.headers.common['Authorization'] = token;
        return Promise.resolve();
      })
      .catch(err => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        return Promise.reject(err);
      });
  },
  [AuthKeys.SIGNUP]: ({ dispatch }, { email, password }): Promise<void> => {
    return signup(email, password)
      .then(() => {
        dispatch(AuthKeys.LOGIN, { email, password });
        return Promise.resolve();
      })
      .catch(Promise.reject);
  },
  [AuthKeys.LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AuthKeys.LOGOUT);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      delete api.defaults.headers.common['Authorization'];
      resolve();
    });
  },
};

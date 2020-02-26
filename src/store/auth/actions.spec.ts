import { when } from 'jest-when';

import { signup, login } from '@/api/user';
import { actions } from './actions';
import { callAction, initContext } from '@/utils/test';
import { AuthState } from '.';
import { LoginResponse } from '@/api/user';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { AuthActions, AuthMutations } from './keys';

jest.mock('@/api/user');

describe('Actions', () => {
  let setItemMock: jest.SpyInstance;
  let removeItemMock: jest.SpyInstance;
  const email = 'admin@crounch.me';
  const password = 'pass';
  const context = initContext<AuthState>({
    dispatch: jest.fn(),
    commit: jest.fn(),
  });

  const callAuthAction = callAction(context, actions);

  beforeEach(() => {
    setItemMock = jest.spyOn(Storage.prototype, 'setItem');
    removeItemMock = jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    jest.resetAllMocks();
    removeItemMock.mockRestore();
  });

  describe('SIGNUP', () => {
    beforeEach(() => {
      (signup as jest.Mock).mockResolvedValue({});
    });

    it('Should call api with right parameters.', () => {
      callAuthAction(AuthActions.SIGNUP, { email, password });

      expect(signup as jest.Mock).toHaveBeenCalledWith(email, password);
    });

    it('Should call dispatch login action when the request succeed.', done => {
      callAuthAction(AuthActions.SIGNUP, { email, password });

      setTimeout(() => {
        expect(context.dispatch).toHaveBeenCalledWith(AuthActions.LOGIN, { email, password });
        done();
      });
    });
  });

  describe('LOGIN', () => {
    const token = 'user token';

    beforeEach(() => {
      when(login as jest.Mock)
        .calledWith(email, password)
        .mockResolvedValue({ accessToken: token } as LoginResponse);
    });

    it('Should call api with right parameters.', () => {
      callAuthAction(AuthActions.LOGIN, { email, password });

      expect(login as jest.Mock).toHaveBeenCalledWith(email, password);
    });

    it('Should call commit login when the request succeed.', done => {
      callAuthAction(AuthActions.LOGIN, { email, password });

      setTimeout(() => {
        expect(context.commit).toHaveBeenCalledWith(AuthActions.LOGIN, token);
        done();
      });
    });

    it('Should store token when request succeed.', done => {
      callAuthAction(AuthActions.LOGIN, { email, password });

      setTimeout(() => {
        expect(setItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, token);
        done();
      });
    });

    it('Should remove token from storage when request failed.', done => {
      (login as jest.Mock).mockRejectedValue({});
      callAuthAction(AuthActions.LOGIN, { email, password })
        .then(() => expect(true).toBeFalsy())
        .catch(() => {
          expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
          done();
        });
    });
  });

  describe('LOGOUT', () => {
    it('Should commit logout mutation.', () => {
      callAuthAction(AuthActions.LOGOUT);

      expect(context.commit).toHaveBeenCalledWith(AuthMutations.LOGOUT);
    });

    it('Should remove token from storage.', () => {
      callAuthAction(AuthActions.LOGOUT);

      expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
    });
  });
});

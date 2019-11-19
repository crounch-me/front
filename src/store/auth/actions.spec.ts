import { signup, login } from '@/api/user';
import { actions } from './actions';
import { AuthKeys } from './keys';
import { callAction, initContext } from '@/utils/test';
import { AuthState } from '.';
import { LoginResponse } from '@/models/user';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { when } from 'jest-when';
import { api } from '@/api/api';

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
      callAuthAction(AuthKeys.SIGNUP, { email, password });

      expect(signup as jest.Mock).toHaveBeenCalledWith(email, password);
    });

    it('Should call dispatch login action when the request succeed.', done => {
      callAuthAction(AuthKeys.SIGNUP, { email, password });

      setTimeout(() => {
        expect(context.dispatch).toHaveBeenCalledWith(AuthKeys.LOGIN, { email, password });
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
      callAuthAction(AuthKeys.LOGIN, { email, password });

      expect(login as jest.Mock).toHaveBeenCalledWith(email, password);
    });

    it('Should store token when request succeed.', done => {
      callAuthAction(AuthKeys.LOGIN, { email, password });

      setTimeout(() => {
        expect(setItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, token);
        done();
      });
    });

    it('Should add token to default headers of api.', done => {
      callAuthAction(AuthKeys.LOGIN, { email, password });

      setTimeout(() => {
        expect(api.defaults.headers.common['Authorization']).toEqual(token);
        done();
      });
    });

    it('Should remove token from storage when request failed.', done => {
      (login as jest.Mock).mockRejectedValue({});
      callAuthAction(AuthKeys.LOGIN, { email, password })
        .then(() => expect(true).toBeFalsy())
        .catch(() => {
          expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
          done();
        });
    });
  });

  describe('LOGOUT', () => {
    it('Should commit logout mutation.', () => {
      callAuthAction(AuthKeys.LOGOUT);

      expect(context.commit);
    });

    it('Should remove token from default headers.', done => {
      callAuthAction(AuthKeys.LOGOUT, { email, password });

      setTimeout(() => {
        expect(api.defaults.headers.common['Authorization']).toBeUndefined();
        done();
      });
    });

    it('Should remove token from storage.', () => {
      callAuthAction(AuthKeys.LOGOUT);

      expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY);
    });
  });
});

import { api } from './api';
import { addUnauthorizedInterceptor, unauthorizedInterceptor } from './interceptors';

jest.mock('./api');

describe('Interceptors', () => {
  describe('unauthorizedInterceptor', () => {
    const logout = jest.fn();
    const unauthorizedError: any = {
      status: 401,
      config: {
        __isRetryRequest: false,
      },
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('Should not logout user when not unauthorized.', done => {
      const otherError: any = {
        status: 500,
        config: {
          __isRetryRequest: false,
        },
      };

      unauthorizedInterceptor(logout)(otherError).catch(() => {
        expect(logout).not.toHaveBeenCalled();
        done();
      });
    });

    it('Should logout user when unauthorized.', done => {
      unauthorizedInterceptor(logout)(unauthorizedError).catch(() => {
        expect(logout).toHaveBeenCalled();
        done();
      });
    });

    it('Should return the error.', done => {
      unauthorizedInterceptor(logout)(unauthorizedError).catch(err => {
        expect(err).toEqual(unauthorizedError);
        done();
      });
    });
  });

  describe('addUnauthorizedInterceptor', () => {
    it('Should add interceptor to api', () => {
      const logout = jest.fn();

      addUnauthorizedInterceptor(logout);

      expect(api.interceptors.response.use).toHaveBeenCalled();
    });
  });
});

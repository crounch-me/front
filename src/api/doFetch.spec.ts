import { mock } from 'jest-mock-extended'

import { doFetch } from './doFetch';
import { getAPIURL } from '@/utils/environment';
import { FetchError } from '@/utils/error';

jest.mock('@/utils/environment');

describe('API', () => {
  let getItemMock: jest.SpyInstance;

  const token = 'token';
  const expectedHeaders = {
    Authorization: token,
  };
  const apiUrl = 'apiUrl';
  const url = 'hello';

  beforeEach(() => {
    const responseMock: Response = mock<Response>({
      status: 200,
      json: jest.fn().mockResolvedValue({ data: "body" })
    })

    getItemMock = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    (getAPIURL as jest.Mock).mockReturnValue(apiUrl);

    (global as any).fetch = jest.fn(() => Promise.resolve(responseMock));
  });

  afterEach(() => {
    ((global as any).fetch as jest.Mock).mockRestore();
    jest.resetAllMocks();
    getItemMock.mockRestore();
  });

  describe('doFetch', () => {
    it('Should do fetch with right parameters, without body.', () => {
      doFetch({
        path: url,
        method: 'GET',
        data: {
          name: 'test'
        }
      });

      expect(fetch).toHaveBeenCalledWith(`${apiUrl}/${url}`, {
        method: 'GET',
        headers: expectedHeaders,
      });
    });

    it('Should do fetch with right parameters, with body.', () => {
      const data = {
        name: 'user',
      };
      doFetch({
        path: 'hello',
        method: 'POST',
        data,
      });

      expect(fetch).toHaveBeenCalledWith(`${apiUrl}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: expectedHeaders,
      });
    });

    it('Should return response body when status code is between 200 and 299 but not 204.', done => {
      doFetch({
        path: url,
        method: 'GET'
      }).then(body => {
        expect(body).toBe('body');
        done();
      });
    });

    it('Should return nothing when status code is 204.', done => {
      const noContentMock: Response = mock<Response>({
        status: 204,
      });
      (global as any).fetch = jest.fn(() => Promise.resolve(noContentMock));

      doFetch({
        path: url,
        method: 'DELETE'
      }).then(body => {
        expect(body).toBeUndefined()
        done()
      })
    })

    it('Should throw FetchError when status code is below 200.', done => {
      const errorBody = {
        code: 'error code',
        description: 'error description',
      };

      const errorResponseMock: Response = mock<Response>({
        status: 199,
        json: jest.fn().mockResolvedValue(errorBody)
      });

      (global as any).fetch = jest.fn(() => Promise.resolve(errorResponseMock));

      doFetch({
        path: 'hello',
        method: 'GET'
      })
        .then(() => expect(true).toBe(false))
        .catch((err: FetchError) => {
          expect(err.code).toBe(errorBody.code)
          expect(err.description).toBe(errorBody.description)
          done();
        });
    });

    it('Should throw FetchError when status code is above 299.', done => {
      const errorBody = {
        code: 'error code',
        description: 'error description',
      };

      const errorResponseMock: Response = mock<Response>({
        status: 300,
        json: jest.fn().mockResolvedValue(errorBody)
      });

      (global as any).fetch = jest.fn(() => Promise.resolve(errorResponseMock));

      doFetch({
        path: 'hello',
        method: 'GET'
      })
        .then(() => expect(true).toBe(false))
        .catch((err: FetchError) => {
          expect(err.code).toBe(errorBody.code)
          expect(err.description).toBe(errorBody.description)
          done();
        });
    });
  });
});

import { doFetch } from './api';
import { getAPIURL } from '@/utils/environment';

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
    getItemMock = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    (getAPIURL as jest.Mock).mockReturnValue(apiUrl);

    (global as any).fetch = jest.fn(() => Promise.resolve({
      json: () => 'response'
    }));
  });

  afterEach(() => {
    ((global as any).fetch as jest.Mock).mockRestore();
    jest.resetAllMocks();
    getItemMock.mockRestore();
  });

  describe('doFetch', () => {
    it('Should do fetch with right parameters, without body.', () => {
      doFetch({
        url,
        method: 'GET'
      });

      expect(fetch).toHaveBeenCalledWith(`${apiUrl}/${url}`, {
        method: 'GET',
        headers: expectedHeaders,
        body: undefined,
      })
    });

    it('Should do fetch with right parameters, with body.', () => {
      const data = {
        name: 'user',
      };
      doFetch({
        url: 'hello',
        method: 'POST',
        data,
      });

      expect(fetch).toHaveBeenCalledWith(`${apiUrl}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: expectedHeaders,
      });
    });
  });
});

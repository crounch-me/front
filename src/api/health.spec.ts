import { doFetch } from './api';
import { health } from './health';

jest.mock('./api');

describe('Health API', () => {
  beforeEach(() => {
    (doFetch as jest.Mock).mockClear();
    (doFetch as jest.Mock).mockReturnValue(Promise.resolve({}));
  });

  it('Should call signup endpoint with right parameters.', () => {
    health();

    expect(doFetch).toHaveBeenCalledWith({
      url: 'health',
      method: 'GET',
    });
  });
});

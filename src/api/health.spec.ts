import { api } from './api';
import { health } from './health';

jest.mock('./api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('Health API', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockClear();
    (api.get as jest.Mock).mockReturnValue(Promise.resolve({}));
  });

  it('Should call signup endpoint with right parameters.', () => {
    health();

    expect(api.get).toHaveBeenCalledWith('health');
  });
});

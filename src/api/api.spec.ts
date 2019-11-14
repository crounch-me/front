import { api } from './api';
import { getAPIURL } from '@/utils/environment';

describe('API', () => {
  it('Should be initialized with correct base URL.', () => {
    expect(api.defaults.baseURL).toEqual(getAPIURL());
  });
});

import { getAPIURL } from './environment';

describe('Environment', () => {
  describe('getAPIURL', () => {
    afterAll(() => {
      process.env.NODE_ENV = 'test';
    });

    it('Should return remote URL when in production env.', () => {
      const prodUrl = 'http://prod.com';
      process.env.VUE_APP_API_URL = prodUrl;
      expect(getAPIURL()).toBe(prodUrl);
    });

    it('Should return another url URL when not in production env.', () => {
      const devUrl = 'http://dev.fr';
      process.env.VUE_APP_API_URL = devUrl;
      expect(getAPIURL()).toBe(devUrl);
    });
  });
});

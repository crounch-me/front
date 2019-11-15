import { getAPIURL, getVersion } from './environment';

describe('Environment', () => {
  describe('getAPIURL', () => {
    afterAll(() => {
      process.env.NODE_ENV = 'test';
    });

    it('Should return remote URL when in production env.', () => {
      process.env.NODE_ENV = 'production';
      expect(getAPIURL()).toBe('http://crounch.me:3000/');
    });

    it('Should return local URL when not in production env.', () => {
      process.env.NODE_ENV = 'develop';
      expect(getAPIURL()).toBe('http://localhost:3000/');
    });
  });

  describe('getVersion', () => {
    it('Should return the version in the package json file.', () => {
      expect(getVersion()).not.toBe(undefined);
      expect(getVersion().match(/^[0-9]\.[0-9]\.[0-9]$/)).toBeTruthy();
    });
  });
});

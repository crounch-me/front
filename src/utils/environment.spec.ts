import { getAPIURL } from './environment';


describe('Environment', () => {
  describe('getAPIURL', () => {
    afterAll(() => {
      process.env.NODE_ENV = 'test';
    });

    it('Should return remote URL when in production env.', () => {
      process.env.NODE_ENV = 'production';
      expect(getAPIURL()).toEqual('http://crounch.me:3000/');
    });

    it('Should return local URL when not in production env.', () => {
      process.env.NODE_ENV = 'develop';
      expect(getAPIURL()).toEqual('http://localhost:3000/');
    });
  });
});

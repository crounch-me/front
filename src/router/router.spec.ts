import Home from '@/views/Home/Home.vue';
import About from '@/views/About/About.vue';
import router from './index';

describe('router', () => {
  describe('Home', () => {
    it('Should return Home component on path "/".', () => {
      router.push('/');

      expect(router.getMatchedComponents()[0]).toEqual(Home);
    });

    it('Should return Home component on name "home".', () => {
      router.push({ name: 'about' });
      router.push({ name: 'home' });

      expect(router.getMatchedComponents()[0]).toEqual(Home);
    });
  });

  describe('About', () => {
    it('Should return About component on path "/about"', () => {
      router.push('/about');

      expect(router.getMatchedComponents()[0]).toEqual(About);
    });

    it('Should return About component on name "about".', () => {
      router.push('/');
      router.push({ name: 'about' });

      expect(router.getMatchedComponents()[0]).toEqual(About);
    });
  });
});

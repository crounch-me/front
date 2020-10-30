import Home from '@/views/Home.vue';
import Version from '@/views/Version.vue';
import NotFound from '@/views/NotFound.vue';
import Lists from '@/views/Lists.vue';
import List from '@/views/List.vue';
import router from './router';

describe('router', () => {
  describe('Home', () => {
    it('Should return Home component on path "/".', () => {
      router.push('/');

      expect(router.getMatchedComponents()[0]).toEqual(Home);
    });

    it('Should return Home component on name "home".', () => {
      router.push({ name: 'lists' });
      router.push({ name: 'home' });

      expect(router.getMatchedComponents()[0]).toEqual(Home);
    });
  });

  describe('Version', () => {
    it('Should return Version component on path "/version".', () => {
      router.push('/version');

      expect(router.getMatchedComponents()[0]).toEqual(Version);
    });

    it('Should return Version component on name "version".', () => {
      router.push('/');
      router.push({ name: 'version' });

      expect(router.getMatchedComponents()[0]).toEqual(Version);
    });
  });

  describe('Lists', () => {
    it('Should return Lists component on path "/lists"', () => {
      router.push('/lists');

      expect(router.getMatchedComponents()[0]).toEqual(Lists);
    });

    it('Should return Lists component on name "lists".', () => {
      router.push('/');
      router.push({ name: 'lists' });

      expect(router.getMatchedComponents()[0]).toEqual(Lists);
    });
  });

  describe('List', () => {
    it('Should return List component on path "/lists/:id"', () => {
      router.push('/lists/1');

      expect(router.getMatchedComponents()[0]).toEqual(List);
    });

    it('Should return List component on name "lists".', () => {
      router.push('/');
      router.push({ name: 'list', params: { id: '1' } });

      expect(router.getMatchedComponents()[0]).toEqual(List);
    });
  });

  describe('NotFound', () => {
    it('Should return NotFound component on unknown path.', () => {
      router.push('/not-found');

      expect(router.getMatchedComponents()[0]).toEqual(NotFound);
    });
  });
});

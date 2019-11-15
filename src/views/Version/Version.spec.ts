import Version from './Version.vue';
import { health } from '@/api/health';
import { getVersion } from '@/utils/environment';
import { shallowComponent } from '@/utils/test';

jest.mock('@/api/health');
jest.mock('@/utils/environment');

describe('Version', () => {
  beforeEach(() => {
    (health as jest.Mock).mockResolvedValue({ version: '1.2.3' });
    (getVersion as jest.Mock).mockReturnValue('3.2.1');
  });

  describe('Init', () => {
    it('Should initialize backVersion to empty string.', () => {
      const wrapper = shallowComponent(Version);

      expect(wrapper.vm.$data.backVersion).toBe('');
    });

    it('Should initialize frontVersion to current version.', () => {
      const wrapper = shallowComponent(Version);

      expect(wrapper.vm.$data.frontVersion).toBe('3.2.1');
    });
  });

  it('Should render.', done => {
    const wrapper = shallowComponent(Version);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

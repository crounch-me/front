import { shallowComponent } from '@/utils/test';
import NotFound from './NotFound.vue';


describe('NotFound', () => {
  it('Should render a not found page.', () => {
    const wrapper = shallowComponent(NotFound);

    expect(wrapper).toMatchSnapshot();
  });
});

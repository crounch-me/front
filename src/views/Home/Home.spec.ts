import { shallowComponent } from '../../../utils/test';
import Home from './Home.vue';

describe('Home', () => {
  it('Should render.', () => {
    const wrapper = shallowComponent(Home);

    expect(wrapper).toMatchSnapshot();
  });
})

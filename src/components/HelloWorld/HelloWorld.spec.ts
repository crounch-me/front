import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';
import { shallowComponent } from '../../utils/test';

describe('HelloWorld', () => {
  const msg = 'new message';
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowComponent(HelloWorld, { msg });
  });

  it('Should init component with the right name', () => {
    expect(wrapper.props(''));
  });

  it('Should render message passed in props', () => {
    expect(wrapper.text()).toMatch(msg);
  });
});

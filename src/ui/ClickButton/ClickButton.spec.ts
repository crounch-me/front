import { shallowComponent } from '@/utils/test';
import ClickButton from './ClickButton.vue';

describe('ClickButton', () => {
  const slots = {
    default: 'Hello',
  };

  it('Should render.', () => {
    const wrapper = shallowComponent(ClickButton, { slots });
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallowComponent } from '@/utils/test';
import ClickButton from './ClickButton.vue';

describe('ClickButton', () => {
  const defaultProps = {
    value: 'Confirmer'
  };

  it('Should render.', () => {
    const wrapper = shallowComponent(ClickButton);
    expect(wrapper).toMatchSnapshot();
  });
});

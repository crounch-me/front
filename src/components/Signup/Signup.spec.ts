import { shallowComponent } from '../../../utils/test';
import Signup from './Signup.vue';

describe('Signup', () => {
  it('Should render an error when email is less than 3 characters.', () => {
    const wrapper = shallowComponent(Signup, { email: '' })

    expect(wrapper.find('.error').exists()).toBeTruthy();
  });

  it('Should not render an error when email is more than 3 characters.', () => {
    const wrapper = shallowComponent(Signup, { email: 'Hello' });

    expect(wrapper.find('.error').exists()).toBeFalsy();
  });
});

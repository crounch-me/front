import { Wrapper } from '@vue/test-utils';

import Signup from '@/components/Signup/Signup.vue';
import { shallowComponent } from '../../../utils/test';

describe('Signup', () => {
  let wrapper: Wrapper<Signup>;

  beforeEach(() => {
    wrapper = shallowComponent(Signup);
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Init', () => {
    it('Should initialize email to empty string.', () => {
      expect(wrapper.vm.$data.email).toBe('');
    });

    it('Should initialize password to empty string.', () => {
      expect(wrapper.vm.$data.password).toBe('');
    });
  })

  it('Should render an error when email is less than 3 characters.', () => {
    expect(wrapper.find('.error').exists()).toBeTruthy();
  });

  it('Should not render an error when email is more than 3 characters.', () => {
    wrapper.setData({ email: 'Hello' });
    expect(wrapper.find('.error').exists()).toBeFalsy();
  });

  it('Should not render an error when email is exactly 3 characters.', () => {
    wrapper.setData({ email: 'aha' });
    expect(wrapper.find('.error').exists()).toBeFalsy();
  });
});

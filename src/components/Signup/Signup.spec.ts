import { Wrapper } from '@vue/test-utils';
import { when } from 'jest-when';
import axios from 'axios';

import Signup from '@/components/Signup/Signup.vue';
import { shallowComponent } from '../../utils/test';
import { validateEmail } from '../../utils/form-validation';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

jest.mock('../../utils/form-validation')

describe('Signup', () => {
  let wrapper: Wrapper<Signup>;
  const email = 'a';
  const password = 'password';

  beforeEach(() => {
    (axios.post as jest.Mock).mockClear();
    (axios.post as jest.Mock).mockReturnValue(Promise.resolve({}));
    wrapper = shallowComponent(Signup);
  });

  afterEach(() => {
    wrapper.destroy();
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

    it('Should initialize signupSuccess to false.', () => {
      expect(wrapper.vm.$data.signupSuccess).toBe(false);
    });
  });

  describe('Form validation', () => {
    describe('Email', () => {
      it('Should render an error when email is not valid.', () => {
        when(validateEmail as jest.Mock).calledWith(email).mockReturnValue(false);
        wrapper.setData({ email });
        expect(wrapper.find('#email-error').exists()).toBeTruthy();
      });

      it('Should not render an error when email is valid.', () => {
        when(validateEmail as jest.Mock).calledWith(email).mockReturnValue(true);
        wrapper.setData({ email });
        expect(wrapper.find('#email-error').exists()).toBeFalsy();
      });
    });

    describe('Password', () => {
      it('Should render an error when password input is not filled.', () => {
        expect(wrapper.find('#password-error').exists()).toBeTruthy();
      });

      it('Should not render an error when password input is filled.', () => {
        wrapper.setData({ password: 'az' });

        expect(wrapper.find('#password-error').exists()).toBeFalsy();
      });
    });
  });

  describe('Form submission', () => {
    it('Should not call api when email is in error and not password.', () => {
      when(validateEmail as jest.Mock).calledWith(email).mockReturnValue(false);
      wrapper.setData({ password: 'password', email });

      wrapper.find('input[type=submit]').trigger('click');

      expect(axios.post as jest.Mock).not.toHaveBeenCalled();
    });

    it('Should not call api when password is in error and not email.', () => {
      when(validateEmail as jest.Mock).calledWith(email).mockReturnValue(true);
      wrapper.setData({ password: '', email });

      wrapper.find('input[type=submit]').trigger('click');

      expect(axios.post as jest.Mock).not.toHaveBeenCalled();
    });

    it('Should call api with right parameters when everything is valid.', () => {
      when(validateEmail as jest.Mock).calledWith(email).mockReturnValue(true);
      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      expect(axios.post as jest.Mock).toHaveBeenCalledWith('http://localhost:3000/users', { email, password });
    });

    it('Should display success message when user has signed up.', done => {
      when(validateEmail as jest.Mock).calledWith(email).mockReturnValue(true);
      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      setTimeout(() => {
        expect(wrapper.find('.success').exists()).toBeTruthy();
        done();
      });
    });
  });
});

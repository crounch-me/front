import { Wrapper } from '@vue/test-utils';
import { when } from 'jest-when';
import { Module } from 'vuex';

import { signup } from '@/api/user';
import Signup from '@/components/Signup/Signup.vue';
import { validateEmail } from '@/utils/form-validation';
import { shallowComponent } from '@/utils/test';
import { AuthActions } from '@/store/auth/keys';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { AuthState } from '@/store/auth';
import { RootState } from '@/store';

jest.mock('@/api/user');
jest.mock('@/utils/form-validation');

describe('Signup', () => {
  let wrapper: Wrapper<Signup>;
  let auth: Module<AuthState, RootState>;
  const email = 'a';
  const password = 'password';

  beforeEach(() => {
    auth = createAuthModuleMock();
    const modules = {
      auth,
    };
    wrapper = shallowComponent(Signup, { modules });
    (signup as jest.Mock).mockResolvedValue({});
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
        when(validateEmail as jest.Mock)
          .calledWith(email)
          .mockReturnValue(false);
        wrapper.setData({ email });
        expect(wrapper.find('#email-error').exists()).toBeTruthy();
      });

      it('Should not render an error when email is valid.', () => {
        when(validateEmail as jest.Mock)
          .calledWith(email)
          .mockReturnValue(true);
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
    it('Should not dispatch store signup when email is in error and not password.', () => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(false);

      wrapper.setData({ password: 'password', email });

      wrapper.find('input[type=submit]').trigger('click');

      expect(auth.actions![AuthActions.SIGNUP] as jest.Mock).not.toHaveBeenCalled();
    });

    it('Should not dispatch store signup when password is in error and not email.', () => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);

      wrapper.setData({ password: '', email });

      wrapper.find('input[type=submit]').trigger('click');

      expect(auth.actions![AuthActions.SIGNUP] as jest.Mock).not.toHaveBeenCalled();
    });

    it('Should dispatch store signup action with right parameters when everything is valid.', () => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);

      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      expect(auth.actions![AuthActions.SIGNUP] as jest.Mock).toHaveBeenCalledWith(
        expect.anything(),
        { email, password }
      );
    });

    it('Should display success message when user has signed up.', done => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);

      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      setTimeout(() => {
        expect(wrapper.find('.success').exists()).toBeTruthy();
        done();
      });
    });
  });
});

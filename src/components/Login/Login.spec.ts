import { Wrapper } from '@vue/test-utils';
import { when } from 'jest-when';

import { login } from '@/api/user';
import Login from './Login.vue';
import { validateEmail } from '@/utils/form-validation';
import { shallowComponent } from '@/utils/test';
import { Module } from 'vuex';
import { AuthState } from '@/store/auth';
import { RootState } from '@/store';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { AuthKeys } from '@/store/auth/keys';

jest.mock('@/api/user');
jest.mock('@/utils/form-validation');

describe('Login', () => {
  let wrapper: Wrapper<Login>;
  let auth: Module<AuthState, RootState>;
  const email = 'a';
  const password = 'password';
  const token = 'auth-token';

  beforeEach(() => {
    auth = createAuthModuleMock();

    const modules = {
      auth,
    };

    wrapper = shallowComponent(Login, { modules });
    (login as jest.Mock).mockResolvedValue({ accessToken: token });
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

    it('Should initialize loginSuccess to false.', () => {
      expect(wrapper.vm.$data.loginSuccess).toBe(false);
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
    it('Should not call api when email is in error and not password.', () => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(false);
      wrapper.setData({ password: 'password', email });

      wrapper.find('input[type=submit]').trigger('click');

      expect(auth.actions![AuthKeys.LOGIN] as jest.Mock).not.toHaveBeenCalled();
    });

    it('Should not call api when password is in error and not email.', () => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);
      wrapper.setData({ password: '', email });

      wrapper.find('input[type=submit]').trigger('click');

      expect(auth.actions![AuthKeys.LOGIN] as jest.Mock).not.toHaveBeenCalled();
    });

    it('Should call api with right parameters when everything is valid.', () => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);

      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      expect(auth.actions![AuthKeys.LOGIN] as jest.Mock).toHaveBeenCalledWith(
        expect.anything(),
        { email, password }
      );
    });

    it('Should redirect to lists page when request succeed.', done => {
      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);

      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      setTimeout(() => {
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('lists');
        done();
      });
    });
  });
});

import { Wrapper } from '@vue/test-utils';
import { when } from 'jest-when';
import { Module } from 'vuex';
import Vue from 'vue';
import flushPromises from 'flush-promises'

import Signup from '@/components/Signup/Signup.vue';
import { validateEmail } from '@/utils/form-validation';
import { shallowComponent } from '@/utils/test';
import { AuthActions } from '@/store/auth/keys';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { AuthState } from '@/store/auth';
import { RootState } from '@/store';
import { FetchError } from '@/utils/error';

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

      it('Should not render an error when email is valid.', done => {
        when(validateEmail as jest.Mock)
          .calledWith(email)
          .mockReturnValue(true);

        wrapper.setData({ email });

        Vue.nextTick().then(() => {
          expect(wrapper.find('#email-error').exists()).toBeFalsy();
          done();
        });
      });
    });

    describe('Password', () => {
      it('Should render an error when password input is not filled.', () => {
        expect(wrapper.find('#password-error').exists()).toBeTruthy();
      });

      it('Should not render an error when password input is filled with correct value.', done => {
        wrapper.setData({ password: 'azaa' });

        Vue.nextTick(() => {
          expect(wrapper.find('#password-error').exists()).toBeFalsy();
          done();
        });
      });
    });
  });

  describe('Form submission', () => {
    it('Should display error message when server returns Conflict.', done => {
      const error: Partial<FetchError> = {
        status: 409,
      };
      auth.actions = {
        [AuthActions.SIGNUP]: jest.fn().mockRejectedValue(error)
      }

      const modules = {
        auth,
      };

      wrapper = shallowComponent(Signup, { modules });

      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);

      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      flushPromises().then(() => {
        expect(wrapper.find('#signup-error').text()).toBe('Cet email est invalide ou déjà pris.');
        done();
      });
    });

    it('Should display error message when server returns Internal Server Error.', done => {
      const error: Partial<FetchError> = {
        status: 500,
      };
      auth.actions = {
        [AuthActions.SIGNUP]: jest.fn().mockRejectedValue(error)
      }

      const modules = {
        auth,
      };

      wrapper = shallowComponent(Signup, { modules });

      when(validateEmail as jest.Mock)
        .calledWith(email)
        .mockReturnValue(true);

      wrapper.setData({ password, email });

      wrapper.find('[type=submit]').trigger('click');

      flushPromises().then(() => {
        expect(wrapper.find('#signup-error').text()).toBe('Une erreur inconnue est survenue.');
        done();
      })
    });

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
  });
});

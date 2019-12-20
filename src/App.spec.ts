import { shallowComponent } from './utils/test';
import { createAuthModuleMock } from './store/auth/mockModule';
import App from './App.vue';
import { addUnauthorizedInterceptor } from './api/interceptors';
import { Module } from 'vuex';
import { AuthState } from './store/auth';
import { RootState } from './store';
import { Wrapper } from '@vue/test-utils';
import { AuthGetters } from './store/auth/keys';

jest.mock('./api/interceptors');

describe('App', () => {
  let wrapper: Wrapper<App>;
  let auth: Module<AuthState, RootState>;

  beforeEach(() => {
    auth = createAuthModuleMock();

    const modules = {
      auth,
    };

    wrapper = shallowComponent(App, { modules });
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render when user is authenticated.', () => {
    auth = createAuthModuleMock();
    (auth.getters![AuthGetters.IS_AUTHENTICATED] as jest.Mock).mockReturnValue(true);

    const modules = {
      auth,
    };

    wrapper = shallowComponent(App, { modules });

    expect(wrapper).toMatchSnapshot();
  });

  it('Should add interceptor to api when created.', () => {
    expect(addUnauthorizedInterceptor as jest.Mock).toHaveBeenCalled();
  });
});

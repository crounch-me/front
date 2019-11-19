import { shallowComponent } from '../../utils/test';
import Home from './Home.vue';
import { Module } from 'vuex';
import { AuthState } from '@/store/auth';
import { RootState } from '@/store';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { Wrapper } from '@vue/test-utils';
import { AuthKeys } from '@/store/auth/keys';

describe('Home', () => {
  let wrapper: Wrapper<Home>;
  let auth: Module<AuthState, RootState>;
  beforeEach(() => {
    auth = createAuthModuleMock();

    wrapper = shallowComponent(Home, {}, { auth });
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render when user is authenticated.', () => {
    auth = createAuthModuleMock();
    (auth.getters!['isAuthenticated'] as jest.Mock).mockReturnValue(true);

    wrapper = shallowComponent(Home, {}, { auth });

    expect(wrapper).toMatchSnapshot();
  });

  it('Should call logout when logout button is clicked.', () => {
    wrapper.find('#logout').trigger('click');

    expect(auth.actions![AuthKeys.LOGOUT]).toHaveBeenCalled();
  });
});

import { Wrapper } from '@vue/test-utils';
import { Module } from 'vuex';

import { shallowComponent } from '../../utils/test';
import Home from './Home.vue';
import { AuthState } from '@/store/auth';
import { RootState } from '@/store';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { AuthKeys } from '@/store/auth/keys';
import { ListKeys } from '@/store/list/keys';
import { createListModuleMock } from '@/store/list/mockModule';
import { ListState } from '@/store/list';

describe('Home', () => {
  let wrapper: Wrapper<Home>;
  let auth: Module<AuthState, RootState>;
  let list: Module<ListState, RootState>;

  beforeEach(() => {
    auth = createAuthModuleMock();
    list = createListModuleMock();

    const modules = {
      auth,
      list,
    };

    wrapper = shallowComponent(Home, { modules });
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render when user is authenticated.', () => {
    auth = createAuthModuleMock();
    (auth.getters!['isAuthenticated'] as jest.Mock).mockReturnValue(true);

    const modules = {
      auth,
    };

    wrapper = shallowComponent(Home, { modules });

    expect(wrapper).toMatchSnapshot();
  });

  it('Should call logout when logout button is clicked.', () => {
    wrapper.find('#logout').trigger('click');

    expect(auth.actions![AuthKeys.LOGOUT]).toHaveBeenCalled();
  });

  it('Should redirect to lists page on creation when user is authenticated.', () => {
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('lists');
  });

  it('Should reset the lists in state.', () => {
    wrapper.find('#logout').trigger('click');

    expect(list.mutations![ListKeys.RESET]).toHaveBeenCalled();
  });
});

import { Wrapper } from '@vue/test-utils';
import { Module, ModuleTree } from 'vuex';

import { shallowComponent } from '../../utils/test';
import Home from './Home.vue';
import { AuthState } from '@/store/auth';
import { RootState } from '@/store';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { AuthGetters } from '@/store/auth/keys';
import { createListModuleMock } from '@/store/list/mockModule';
import { ListState } from '@/store/list';

describe('Home', () => {
  let wrapper: Wrapper<Home>;
  let auth: Module<AuthState, RootState>;
  let list: Module<ListState, RootState>;
  let modules: ModuleTree<RootState>;

  beforeEach(() => {
    auth = createAuthModuleMock();
    list = createListModuleMock();

    (auth.getters![AuthGetters.IS_AUTHENTICATED] as jest.Mock).mockReturnValue(true);

    modules = {
      auth,
      list,
    };

    wrapper = shallowComponent(Home, { modules });
  });

  it('Should render when user is not authenticated.', () => {
    mockUserAuthenticated(false);

    wrapper = shallowComponent(Home, { modules });

    expect(wrapper).toMatchSnapshot();
  });

  it('Should render when user is authenticated.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should redirect to lists page on component creation when user is authenticated.', () => {
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('lists');
  });

  it('Should not redirect to lists page on component creation when user is not authenticated.', () => {
    mockUserAuthenticated(false);

    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });

  function mockUserAuthenticated(isAuthenticated: boolean) {
    (auth.getters![AuthGetters.IS_AUTHENTICATED] as jest.Mock).mockReturnValue(isAuthenticated);

    wrapper = shallowComponent(Home, { modules });
  }
});

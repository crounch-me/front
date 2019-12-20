import { shallowComponent } from '@/utils/test';
import Lists from './Lists.vue';
import { AuthState } from '@/store/auth';
import { RootState } from '@/store';
import { Module } from 'vuex';
import { Wrapper } from '@vue/test-utils';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { AuthGetters } from '@/store/auth/keys';

describe('Lists', () => {
  let wrapper: Wrapper<Lists>;
  let auth: Module<AuthState, RootState>;

  beforeEach(() => {
    auth = createAuthModuleMock();

    const modules = {
      auth,
    };

    wrapper = shallowComponent(Lists, { modules });
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

    wrapper = shallowComponent(Lists, { modules });

    expect(wrapper).toMatchSnapshot();
  });
});

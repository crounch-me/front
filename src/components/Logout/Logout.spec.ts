import { Wrapper } from '@vue/test-utils';
import { Module } from 'vuex';

import { AuthState } from '@/store/auth';
import { RootState } from '@/store';
import { createAuthModuleMock } from '@/store/auth/mockModule';
import { shallowComponent } from '@/utils/test';
import Logout from './Logout.vue';
import { AuthActions } from '@/store/auth/keys';
import { ListMutations } from '@/store/list/keys';
import { ListState } from '@/store/list';
import { createListModuleMock } from '@/store/list/mockModule';

describe('Logout', () => {
  let wrapper: Wrapper<Logout>;
  let auth: Module<AuthState, RootState>;
  let list: Module<ListState, RootState>;

  beforeEach(() => {
    auth = createAuthModuleMock();
    list = createListModuleMock();

    const modules = {
      auth,
      list,
    };

    wrapper = shallowComponent(Logout, { modules });
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should call logout when logout button is clicked.', () => {
    wrapper.find('button').trigger('click');

    expect(auth.actions![AuthActions.LOGOUT]).toHaveBeenCalled();
  });

  it('Should call reset mutation when logout button is clicked.', () => {
    wrapper.find('button').trigger('click');

    expect(list.mutations![ListMutations.RESET]).toHaveBeenCalled();
  });

  it('Should redirect to home page when button is clicked.', () => {
    wrapper.find('button').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/');
  });
});

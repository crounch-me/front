import { Module } from 'vuex';
import { Wrapper } from '@vue/test-utils';

import DisplayLists from './DisplayLists.vue';
import { shallowComponent } from '@/utils/test';
import { ListState } from '@/store/list';
import { RootState } from '@/store';
import { createListModuleMock } from '@/store/list/mockModule';

describe('DisplayLists', () => {
  let wrapper: Wrapper<DisplayLists>;
  let list: Module<ListState, RootState>;

  beforeEach(() => {
    list = createListModuleMock();

    wrapper = shallowComponent(DisplayLists, {}, { list });
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

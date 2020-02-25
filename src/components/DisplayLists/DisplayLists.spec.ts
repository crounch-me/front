import { Module } from 'vuex';
import { Wrapper } from '@vue/test-utils';

import DisplayLists from './DisplayLists.vue';
import { shallowComponent } from '@/utils/test';
import { ListState } from '@/store/list';
import { RootState } from '@/store';
import { createListModuleMock } from '@/store/list/mockModule';
import { ListActions, ListGetters } from '@/store/list/keys';
import { List } from '@/models/list';

describe('DisplayLists', () => {
  let wrapper: Wrapper<DisplayLists>;
  let list: Module<ListState, RootState>;

  const lists: List[] = [
    {
      id: 'list id 1',
      name: 'list name 1',
    },
    {
      id: 'list id 2',
      name: 'list name 2',
    },
  ];

  beforeEach(() => {
    list = createListModuleMock();
    (list.getters![ListGetters.GETALL] as jest.Mock).mockReturnValue(lists);

    const modules = { list };

    wrapper = shallowComponent(DisplayLists, { modules });
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should get the list owners when the component is created.', () => {
    expect(list.actions![ListActions.GETOWNERS]).toHaveBeenCalled();
  });

  it('Should go to the list page when I click on a list', () => {
    wrapper = shallowComponent(DisplayLists, { modules: { list } });

    wrapper.find('.list').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(`/lists/${lists[0].id}`);
  });
});

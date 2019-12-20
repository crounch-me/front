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

  beforeEach(() => {
    list = createListModuleMock();

    const modules = { list };

    wrapper = shallowComponent(DisplayLists, { modules });
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should get the list owners when the component is created.', () => {
    expect(list.actions![ListActions.GETOWNERS]).toHaveBeenCalled();
  });

  it('Should display the returned lists.', () => {
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

    (list.getters![ListGetters.LISTS] as jest.Mock).mockReturnValue(lists);

    const modules = { list };

    wrapper = shallowComponent(DisplayLists, { modules });

    expect(wrapper).toMatchSnapshot();
  });
});

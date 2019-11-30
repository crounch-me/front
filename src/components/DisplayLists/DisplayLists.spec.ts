import { Module } from 'vuex';
import { Wrapper } from '@vue/test-utils';

import DisplayLists from './DisplayLists.vue';
import { shallowComponent } from '@/utils/test';
import { ListState } from '@/store/list';
import { RootState } from '@/store';
import { createListModuleMock } from '@/store/list/mockModule';
import { ListKeys } from '@/store/list/keys';
import { List } from '@/models/list';

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

  it('Should get the list owners when the component is created.', () => {
    expect(list.actions![ListKeys.GETOWNERS]).toHaveBeenCalled();
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

    (list.getters!.lists as jest.Mock).mockReturnValue(lists);

    wrapper = shallowComponent(DisplayLists, {}, { list });

    expect(wrapper).toMatchSnapshot();
  });
});

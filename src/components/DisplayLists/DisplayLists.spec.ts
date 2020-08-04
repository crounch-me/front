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
  const ID_1 = 'list_id_1'
  const ID_2 = 'list_id_2'

  const lists: List[] = [
    {
      id: ID_1,
      name: 'list name 1',
      products: []
    },
    {
      id: ID_2,
      name: 'list name 2',
      products: []
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

    wrapper.find('.list:first-child span').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(`/lists/${ID_1}`);
  });

  it('Should delete the list when the delete button is clicked', () => {
    wrapper = shallowComponent(DisplayLists, { modules: { list } });

    wrapper.find('.list:first-child button').trigger('click')

    expect(list.actions![ListActions.DELETE]).toHaveBeenCalledWith(expect.anything(), { id: ID_1 });
  })
});

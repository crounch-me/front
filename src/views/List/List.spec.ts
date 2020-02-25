import { Wrapper } from '@vue/test-utils';

import { shallowComponent } from '@/utils/test';
import ListPage from './List.vue';
import { Module } from 'vuex';
import { ListState } from '@/store/list';
import { ListGetters, ListActions } from '@/store/list/keys';
import { RootState } from '@/store';
import { createListModuleMock } from '@/store/list/mockModule';
import { List } from '@/models/list';

describe('List', () => {
  let wrapper: Wrapper<ListPage>;
  let listModule: Module<ListState, RootState>;
  const list: List = {
    id: 'list id',
    name: 'list name',
  };

  beforeEach(() => {
    listModule = createListModuleMock();
    (listModule.getters![ListGetters.GET] as jest.Mock).mockReturnValue(() => list);
    shallowListComponent();
  });

  it('Should render.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should not fetch lists when list is defined.', () => {
    shallowListComponent();

    expect(listModule.actions![ListActions.GETOWNERS]).not.toHaveBeenCalled();
  });

  it('Should fetch lists when list is undefined.', () => {
    (listModule.getters![ListGetters.GET] as jest.Mock).mockReturnValue(() => undefined);

    shallowListComponent();

    expect(listModule.actions![ListActions.GETOWNERS]).toHaveBeenCalled();
  });

  it('Should display list when the list is defined after fetch.', done => {
    let calledOneTime = false;
    (listModule.getters![ListGetters.GET] as jest.Mock)
      .mockImplementation(() => () => new Promise(resolve => {
        if (!calledOneTime) {
          calledOneTime = true;
          return Promise.resolve(undefined);
        }
        return Promise.resolve(list);
      }));

    shallowListComponent();

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  it('Should display not found message when list does not exist after fetch.', done => {
    (listModule.getters![ListGetters.GET] as jest.Mock).mockReturnValue(() => undefined)
    shallowListComponent();

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot()
      done();
    });
  });

  function shallowListComponent() {
    const modules = {
      list: listModule,
    };

    const values = {
      id: list.id,
    };

    wrapper = shallowComponent(ListPage, { modules, values });
  }
});

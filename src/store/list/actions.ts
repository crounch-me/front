import { ActionTree } from 'vuex';
import { ListState } from '.';
import { RootState } from '..';
import { ListKeys } from './keys';
import { createList } from '@/api/list';
import { List } from '@/models/list';

export const actions: ActionTree<ListState, RootState> = {
  [ListKeys.CREATE]: ({ commit }, { name }): Promise<void> => {
    return createList(name).then((list: List) => {
      commit(ListKeys.ADD, list);
      return Promise.resolve();
    });
  },
};

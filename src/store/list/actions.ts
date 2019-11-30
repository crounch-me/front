import { ActionTree } from 'vuex';
import { ListState } from '.';
import { RootState } from '..';
import { ListKeys } from './keys';
import { createList, getOwnerLists } from '@/api/list';

export const actions: ActionTree<ListState, RootState> = {
  [ListKeys.CREATE]: ({ commit }, { name }): Promise<void> => {
    return createList(name).then(list => {
      commit(ListKeys.ADD, list);
      return Promise.resolve();
    });
  },
  [ListKeys.GETOWNERS]: ({ commit }): Promise<void> => {
    return getOwnerLists().then(lists => {
      commit(ListKeys.SET, lists);
      return Promise.resolve();
    });
  },
};

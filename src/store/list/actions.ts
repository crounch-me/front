import { ActionTree } from 'vuex';
import { createList, getOwnerLists } from '@/api/list';

import { ListState } from '.';
import { RootState } from '..';
import { ListActions, ListMutations } from './keys';

export const actions: ActionTree<ListState, RootState> = {
  [ListActions.CREATE]: ({ commit }, { name }): Promise<void> => {
    return createList(name).then(list => {
      commit(ListMutations.ADD, list);
      return Promise.resolve();
    });
  },
  [ListActions.GETOWNERS]: ({ commit }): Promise<void> => {
    return getOwnerLists().then(lists => {
      commit(ListMutations.SET, lists);
      return Promise.resolve();
    });
  },
};

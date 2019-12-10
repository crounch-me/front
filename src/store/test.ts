import { ActionTree, MutationTree, GetterTree, Module, ActionContext } from 'vuex';
import { RootState } from '.';

export type ActionCall<S, R> = (injectee: ActionContext<S, R>, payload?: any) => any;

export function createStoreModuleMock<S, A, M, G>(initialState: S, actionKeys: A, mutationKeys: M, getterKeys: G): Module<S, RootState> {
  const actions: ActionTree<S, RootState> = {};
  const mutations: MutationTree<S> = {};
  const getters: GetterTree<S, RootState> = {};

  Object.keys(actionKeys).forEach(key => actions[key] = jest.fn());
  Object.keys(mutationKeys).forEach(key => mutations[key] = jest.fn());
  Object.keys(getterKeys).forEach(key => getters[key] = jest.fn());

  return {
    namespaced: true,
    actions,
    getters,
    mutations,
    state: initialState,
  }
}

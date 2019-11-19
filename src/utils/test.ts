import Vue from 'vue';
import Vuex, { ActionContext, ActionTree } from 'vuex';
import { shallowMount, VueClass, createLocalVue } from '@vue/test-utils';

import { RootState, ActionCall } from '@/store';
import router from '@/router';

export function shallowComponent<V extends Vue>(component: VueClass<V>, values: {} = {}, modules: {} = {}) {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  const store = new Vuex.Store({
    modules,
  });

  return shallowMount(component, {
    attachToDocument: true,
    propsData: {
      ...values,
    },
    store,
    router,
    localVue,
  });
}

export const callAction = <S>(context: ActionContext<S, RootState>, actions: ActionTree<S, RootState>) => (
  key: string,
  params?: any
): any => {
  return (actions[key] as ActionCall<S, RootState>)(context, params);
};

export function initContext<S>(context: Partial<ActionContext<S, RootState>>): ActionContext<S, RootState> {
  const emptyContext = createEmptyActionContext<S>();

  return {
    ...emptyContext,
    ...context,
  };
}

function createEmptyActionContext<S>(): ActionContext<S, RootState> {
  return {
    state: {},
    getters: {},
    dispatch: {},
    commit: {},
    rootState: {
      dummy: '',
    },
    rootGetters: {},
  } as ActionContext<S, RootState>;
}

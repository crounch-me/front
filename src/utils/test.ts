import Vue from 'vue';
import VueRouter from 'vue-router';

import Vuex, { ActionContext, ActionTree, ModuleTree } from 'vuex';
import { shallowMount, VueClass, createLocalVue, Slots } from '@vue/test-utils';

import { RootState, ActionCall } from '@/store';

export interface ShallowOptions {
  values?: object;
  modules?: ModuleTree<RootState>;
  slots?: Slots;
}

const emptyOptions: ShallowOptions = {
  values: {},
  modules: {},
  slots: {}
};

export function shallowComponent<V extends Vue>(component: VueClass<V>, { values, modules, slots }: ShallowOptions = emptyOptions) {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  const router = new VueRouter();

  const store = new Vuex.Store<RootState>({
    modules,
  });

  return shallowMount(component, {
    attachToDocument: true,
    propsData: {
      ...values,
    },
    slots,
    store,
    router,
    localVue,
    stubs: ['router-link', 'router-view'],
    mocks: {
      $router: {
        push: jest.fn()
      }
    }
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

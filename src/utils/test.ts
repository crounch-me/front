import Vue from 'vue';
import VueRouter from 'vue-router';

import Vuex, { ModuleTree } from 'vuex';
import { shallowMount, VueClass, createLocalVue, Slots } from '@vue/test-utils';

import { RootState } from '@/store';

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
        push: jest.fn(),
        replace: jest.fn()
      }
    }
  });
}

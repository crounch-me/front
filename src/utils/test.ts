import Vue from 'vue';
import { shallowMount, VueClass } from '@vue/test-utils';

export function shallowComponent<V extends Vue>(component: VueClass<V>, values: {} = {}) {
  return shallowMount(component, {
    attachToDocument: true,
    propsData: {
      ...values
    }
  });
}

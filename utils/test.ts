import { shallowMount } from '@vue/test-utils';

export function shallowComponent(component: any, values: {}) {
  return shallowMount(component, {
    data() {
      return {
        ...values
      }
    }
  });
}

import { configure } from '@storybook/vue';
import Vue from 'vue';
import Vuex from 'vuex';

import ClickButton from '../src/ui/ClickButton/ClickButton.vue';

Vue.use(Vuex);

Vue.component('click-button', ClickButton);

configure(require.context('../src', true, /\.stories\.ts$/), module);

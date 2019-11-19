import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { TOKEN_STORAGE_KEY } from './utils/constants';
import { api } from './api/api';

const token = localStorage.getItem(TOKEN_STORAGE_KEY);
if (token) {
  api.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem('id_token')}`
  return config;
}, function (error) {
  return error
});

Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

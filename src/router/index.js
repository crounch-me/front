import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Callback from '@/components/Callback';
import Signup from '@/components/Signup'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
});

import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home/Home.vue';
import About from '@/views/About/About.vue';
import Version from '@/views/Version/Version.vue';
import NotFound from '@/views/NotFound/NotFound.vue';
import Lists from '@/views/Lists/Lists.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/lists',
    name: 'lists',
    component: Lists,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/version',
    name: 'version',
    component: Version,
  },
  {
    path: '*',
    name: '*',
    component: NotFound,
  }
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

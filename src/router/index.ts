import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '@/views/Home/Home.vue';
import Version from '@/views/Version/Version.vue';
import NotFound from '@/views/NotFound/NotFound.vue';
import Lists from '@/views/Lists/Lists.vue';
import List from '@/views/List/List.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
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
    path: '/version',
    name: 'version',
    component: Version,
  },
  {
    path: '/lists/:id',
    name: 'list',
    component: List,
    props: true
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

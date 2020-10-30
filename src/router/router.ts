import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import Lists from '@/views/Lists.vue';
import List from '@/views/List.vue';

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

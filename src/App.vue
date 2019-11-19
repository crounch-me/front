<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>| <router-link to="/about">About</router-link>|
      <router-link to="/version">Version</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action } from 'vuex-class';
import { addUnauthorizedInterceptor } from './api/interceptors';
import { AuthKeys } from './store/auth/keys';
import { authNamespace } from './store/auth';

@Component
export default class App extends Vue {
  @Action(AuthKeys.LOGOUT) logout: any;
  created() {
    addUnauthorizedInterceptor(this.logout);
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!isAuthenticated" to="/">Home|</router-link>
      <router-link v-if="isAuthenticated" to="lists">Listes |</router-link>
      <router-link to="/about">About|</router-link>
      <router-link to="/version">Version</router-link>
      <Logout v-if="isAuthenticated" />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vue-router';

import Component from 'vue-class-component';
import { Action, Getter } from 'vuex-class';
import { addUnauthorizedInterceptor } from './api/interceptors';
import { AuthActions, AuthGetters } from './store/auth/keys';
import { authNamespace } from './store/auth';
import Logout from './components/Logout/Logout.vue';

@Component({
  components: {
    Logout,
  }
})
export default class App extends Vue {
  @Action(AuthActions.LOGOUT, authNamespace) logout: any;
  @Getter(AuthGetters.IS_AUTHENTICATED, authNamespace) isAuthenticated!: boolean;

  created() {
    addUnauthorizedInterceptor(this.logout);
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

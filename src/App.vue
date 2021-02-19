<template>
  <div id="app">
    <div id="nav" v-if="authModule.isAuthenticated">
      <router-link to="/lists">Listes</router-link>
      <Logout />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vue-router';

import Component from 'vue-class-component';
import Logout from '@/account/ui/components/Logout.vue';
import { AccountModule } from '@/account/store/AccountModule';
import { getModule } from 'vuex-module-decorators';

@Component({
  components: {
    Logout,
  }
})
export default class App extends Vue {
  public authModule: AccountModule = getModule(AccountModule)
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

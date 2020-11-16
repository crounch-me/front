<template>
  <button id="logout" @click.prevent="logout">Se déconnecter</button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { ListModule } from '@/store/list/ListModule';
import { AuthModule } from '@/store/AuthModule';

@Component
export default class Logout extends Vue {
  public authModule: AuthModule = getModule(AuthModule)
  public listModule: ListModule = getModule(ListModule)

  logout() {
    this.listModule.reset()
    this.authModule.logoutAction().then(() => {
      this.$router.push('/');
    })
  }
}
</script>

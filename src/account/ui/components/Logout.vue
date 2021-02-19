<template>
  <button id="logout" @click.prevent="logout">Se déconnecter</button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { ListModule } from '@/store/list/ListModule';
import { AccountModule } from '@/account/store/AccountModule';

@Component
export default class Logout extends Vue {
  public accountModule: AccountModule = getModule(AccountModule)
  public listModule: ListModule = getModule(ListModule)

  logout() {
    this.listModule.reset()
    this.accountModule.logoutAction().then(() => {
      this.$router.push('/');
    })
  }
}
</script>

<template>
  <button id="logout" @click.prevent="logout">Se déconnecter</button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';

import { AuthActions } from '@/store/auth/keys';
import { authNamespace } from '@/store/auth';
import { ListModule } from '@/store/ListModule';
import { getModule } from 'vuex-module-decorators';

@Component
export default class Logout extends Vue {
  public listModule: ListModule = getModule(ListModule, this.$store)
  @Action(AuthActions.LOGOUT, authNamespace) doLogout: any;

  logout() {
    this.listModule.reset()
    this.doLogout();
    this.$router.push('/');
  }
}
</script>

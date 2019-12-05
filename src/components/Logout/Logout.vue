<template>
  <button id="logout" @click.prevent="logout">Se déconnecter</button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';

import { AuthKeys } from '@/store/auth/keys';
import { authNamespace } from '@/store/auth';
import { ListKeys } from '../../store/list/keys';
import { listNamespace } from '../../store/list';

@Component
export default class Logout extends Vue {
  @Action(AuthKeys.LOGOUT, authNamespace) doLogout: any;
  @Mutation(ListKeys.RESET, listNamespace) doReset: any;

  logout() {
    this.doReset();
    this.doLogout();
    this.$router.push('/');
  }
}
</script>

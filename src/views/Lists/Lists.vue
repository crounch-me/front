<template>
  <div>
    <h1>Listes</h1>
    <CreateList v-show="this.isAuthenticated" />
    <DisplayLists />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import CreateList from '@/components/CreateList/CreateList.vue';
import DisplayLists from '@/components/DisplayLists/DisplayLists.vue';
import { authNamespace } from '@/store/auth';

@Component({
  components: {
    CreateList,
    DisplayLists,
  }
})
export default class Lists extends Vue {
  @Getter('isAuthenticated', authNamespace) isAuthenticated!: boolean;
}
</script>

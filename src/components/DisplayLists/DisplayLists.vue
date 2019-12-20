<template>
  <div>
    <h3>Lists</h3>
    <div v-for="list in this.lists" :key="list.id" class="list">
      {{ list.name }}
      {{ list.id }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import { ListState, listNamespace } from '../../store/list';
import { List } from '../../models/list';
import { ListActions, ListGetters } from '../../store/list/keys';

@Component
export default class DisplayLists extends Vue {
  @Action(ListActions.GETOWNERS, listNamespace) getOwners: any;
  @Getter(ListGetters.LISTS, listNamespace) lists!: List[];

  created() {
    this.getOwners();
  }
};
</script>

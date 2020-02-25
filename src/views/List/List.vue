<template>
  <div>
    <div v-if="this.list" id="list">{{ list.name }}</div>
    <div v-else>La liste n'a pas été trouvée</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { ListGetters, ListActions } from '@/store/list/keys';
import { listNamespace } from '@/store/list';
import { List } from '@/models/list';

@Component
export default class ListPage extends Vue {
  @Prop(String) readonly id!: string;
  @Getter(ListGetters.GET, listNamespace) getList!: (id: string) => List;
  @Action(ListActions.GETOWNERS, listNamespace) getOwners!: () => Promise<void>;

  get list() {
    return this.getList(this.id);
  }

  created() {
    if (this.list === undefined) {
      this.getOwners()
    }
  }
}
</script>

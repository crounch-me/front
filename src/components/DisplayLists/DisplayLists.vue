<template>
  <div>
    <h2>Listes</h2>
    <ul>
      <li
        v-for="list in this.lists"
        :key="list.id"
        :id="list.id"
        class="list"
        @click="goToList(list.id)"
      >{{ list.name }}</li>
    </ul>
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
  @Action(ListActions.GETOWNERS, listNamespace) getOwners!: () => List;
  @Getter(ListGetters.GETALL, listNamespace) lists!: List[];

  created() {
    this.getOwners();
  }

  goToList(id: string) {
    this.$router.push(`/lists/${id}`)
  }
};
</script>

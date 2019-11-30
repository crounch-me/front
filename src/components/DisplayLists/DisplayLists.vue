<template>
  <div>
    <h3>Lists</h3>
    <div v-for="list in this.lists" :key="list.id">
      {{ list.name }}
      {{ list.id }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { ListState, listNamespace } from '../../store/list';
import { List } from '../../models/list';

@Component
export default class DisplayLists extends Vue {
  @Getter('lists', listNamespace) lists: List[];
};
</script>

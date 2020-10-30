<template>
  <div>
    <h2>Listes</h2>
    <ul>
      <li v-for="list in lists" :key="list.id" :id="list.id" class="list">
        <span @click="goToList(list.id)">{{ list.name }}</span>
        <button @click="deleteList(list.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { List } from '@/models/list';
import { ListModule } from '@/store/ListModule';
import { getModule } from 'vuex-module-decorators';

@Component
export default class DisplayLists extends Vue {
  public listModule: ListModule = getModule(ListModule)

  async created() {
     this.listModule.getOwners()
  }

  get lists () {
    return this.listModule.all
  }

  goToList(id: string) {
    this.$router.push(`/lists/${id}`)
  }

  async deleteList(id: string) {
   await this.listModule.deleteAction(id)
  }
};
</script>

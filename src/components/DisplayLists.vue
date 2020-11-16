<template>
  <div>
    <h2>Listes</h2>
    <ul>
      <li v-for="list in lists" :key="list.id" :id="list.id" class="list">
        <span @click="goToList(list.id)">{{ list.name }}</span>
        <span v-if="list.archivationDate"> Archivée le {{ list.archivationDate }}</span>
        <button v-if="!list.archivationDate" @click="archiveList(list.id)">Archiver</button>
        <button @click="deleteList(list.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { List } from '@/models/list';
import { ListModule } from '@/store/list/ListModule';

@Component
export default class DisplayLists extends Vue {
  public listModule: ListModule = getModule(ListModule)

  async created() {
     this.listModule.getUsers()
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

  async archiveList(id: string) {
    await this.listModule.archiveList(id)
  }
};
</script>

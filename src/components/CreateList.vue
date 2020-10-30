<template>
  <div id="create-list">
    <h2>Création de liste</h2>
    <div v-if="!isNameValid" id="name-error">Le nom doit être renseigné</div>
    <div v-if="result !== ''" class="result">{{ result }}</div>
    <form @submit.prevent="createList">
      <input type="text" placeholder="Nom" v-model="name" />
      <input type="submit" value="Créer" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { ListModule } from '@/store/ListModule';

@Component
export default class CreateList extends Vue {
  public listModule: ListModule = getModule(ListModule)
  name: string = '';
  result: string = '';

  async createList() {
    if (!this.isNameValid) {
      return;
    }

    await this.listModule.create(this.name)
    this.result = 'Créée'
    this.name = ''
  }

  get isNameValid(): boolean {
    return this.name.length > 0;
  }
}
</script>

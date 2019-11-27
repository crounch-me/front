<template>
  <div id="create-list">
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
import { Action } from 'vuex-class';

import { ListKeys } from '@/store/list/keys';
import { listNamespace } from '@/store/list';

@Component
export default class CreateList extends Vue {
  @Action(ListKeys.CREATE, listNamespace) doCreateList: any;
  name: string = '';
  result: string = '';

  createList() {
    if (!this.isNameValid) {
      return;
    }

    this.doCreateList({ name: this.name }).then(() => {
      this.result = 'Créée';
    });
  }

  get isNameValid(): boolean {
    return this.name.length > 0;
  }
}
</script>

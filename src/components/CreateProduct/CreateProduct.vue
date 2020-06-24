<template>
  <div id="create-product">
    <h2>Création de produit</h2>
    <div v-if="!isNameValid" id="name-error">Le nom doit être renseigné</div>
    <div v-if="result !== ''" class="result">{{ result }}</div>
    <form @submit.prevent="createProduct">
      <input type="text" placeholder="Nom" v-model="name" />
      <input type="submit" value="Créer" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import { ProductActions } from '@/store/product/keys';
import { productNamespace } from '@/store/product';

@Component
export default class CreateProduct extends Vue {
  @Action(ProductActions.CREATE, productNamespace) doCreateProduct: any;
  name: string = '';
  result: string = '';

  createProduct() {
    if (!this.isNameValid) {
      return;
    }

    this.doCreateProduct({ name: this.name }).then(() => {
      this.result = 'Créé';
      this.name = '';
    });
  }

  get isNameValid(): boolean {
    return this.name.length > 0;
  }
}
</script>

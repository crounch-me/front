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
import { createProduct } from '@/api/product';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CreateProduct extends Vue {
  name: string = '';
  result: string = '';

  createProduct() {
    if (!this.isNameValid) {
      return;
    }

    createProduct(this.name).then(() => {
      this.result = 'Créé';
      this.name = '';
    })
  }

  get isNameValid(): boolean {
    return this.name.length > 0;
  }
}
</script>

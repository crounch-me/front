<template>
  <div>
    <form>
      <input type="text" v-model="name" @keyup="search" placeholder="Nom du produit">
    </form>
    <div id="products" v-if="this.products.length">
      <div class=".products" v-for="product in this.products" :key="product.code">
        {{ product.name }}
        {{ product.barCode }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { search } from '@/api/openfoodfacts';
import { Product } from '@/models/product';
import { convertProductFromApi } from '@/utils/converters/product';

@Component
export default class Search extends Vue {
  name: string = '';
  products: Product[] = [];

  search() {
    search(this.name).then(products => {
      this.products = convertProductFromApi(products);
    });
  }
}
</script>

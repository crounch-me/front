<template>
  <div>
    <h3>Rechercher un produit</h3>
    <span v-if="error">{{ error }}</span>
    <input
      id="product-search"
      type="text"
      placeholder="Rechercher un produit"
      v-model="name"
      @keyup="search"
    />
    <ul id="product-search-results">
      <template v-for="product in products">
        <li class="product" :key="product.id" v-if="!isProductInList(product.id)">
          {{ product.name }}
          <button @click="addProduct(product)">Ajouter à la liste</button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';

import { searchProduct } from '@/api/product';
import { Product } from '@/models/product';
import { Events } from '@/utils/events';
import { ListModule } from '@/store/ListModule';
import { getModule } from 'vuex-module-decorators';

@Component
export default class SearchProduct extends Vue {
  public listModule: ListModule = getModule(ListModule)

  public name: string = ""
  public error: string = ""
  public products: Product[] = []

  search() {
    if (this.name.length < 3) {
      this.products = []
      return
    }
    searchProduct(this.name)
      .then(products => this.products = products)
      .catch(err => this.error = err.error)
  }

  addProduct(product: Product) {
    this.listModule.addProductAction(product)
  }

  public isProductInList(id: string): boolean {
    return !!this.listModule.productsInSelectedList.find(productInList => productInList.id === id)
  }
}
</script>

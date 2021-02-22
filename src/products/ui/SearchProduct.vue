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
        <li
          class="product"
          :key="product.id"
          v-if="!isProductInList(product.id)"
        >
          {{ product.name }}
          <button @click="addProduct(product)">Ajouter à la liste</button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { Component } from 'vue-property-decorator'

import { ListModule } from '@/store/list/ListModule'
import { ProductApi } from '@/products/api/ProductApi'
import { ProductSearchResponse } from '@/products/api/responses'

@Component
export default class SearchProduct extends Vue {
  public listModule: ListModule = getModule(ListModule)
  public productApi = new ProductApi()

  public name: string = ""
  public error: string = ""
  public products: ProductSearchResponse[] = []

  async search() {
    if (this.name.length < 3) {
      this.products = []
      return
    }

    try {
      this.products = await this.productApi.searchProduct(this.name)
    } catch (err) {
      this.error = err.error
    }
  }

  addProduct(product: ProductSearchResponse) {
    this.$emit('add-product', product)
  }

  public isProductInList(id: string): boolean {
    return !!this.listModule.productsInSelectedList.find(productInList => productInList.id === id)
  }
}
</script>

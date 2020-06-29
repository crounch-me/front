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
    <ul>
      <li class="product" v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';

import { AuthActions } from '@/store/auth/keys';
import { authNamespace } from '@/store/auth';
import { ListMutations } from '../../store/list/keys';
import { listNamespace } from '../../store/list';
import { searchProduct } from '../../api/product';
import { Product } from '../../models/product';

@Component
export default class SearchProduct extends Vue {
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
}
</script>

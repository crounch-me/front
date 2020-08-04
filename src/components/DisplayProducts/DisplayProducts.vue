<template>
  <div>
    <h3>Produits</h3>
    <ul v-if="products.length" id="list-products">
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
    <p v-else>Aucun produits dans cette liste</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { Product } from '../../models/product';

@Component
export default class DisplayProducts extends Vue {
  @Prop()
  public products!: Product[]
}
</script>

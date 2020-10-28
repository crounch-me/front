<template>
  <div>
    <ul v-if="products.length" id="list-products">
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
        <button class="delete" @click="deleteProduct(product.id)">
          Supprimer
        </button>
      </li>
    </ul>
    <p v-else>Aucun produits dans cette liste</p>
  </div>
</template>

<script lang="ts">
import { Events } from '@/utils/events';
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator';
import { ProductInGetListResponse } from '../../models/product';

@Component
export default class DisplayProducts extends Vue {
  @Prop()
  public products!: ProductInGetListResponse[];

  @Emit(Events.DELETE_PRODUCT)
  private deleteProduct(id: string) {
    return id
  }
}
</script>

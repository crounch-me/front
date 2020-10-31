<template>
  <ul v-if="products.length" id="list-products">
    <li v-for="product in products" :key="product.id">
      {{ product.name }}
      <button class="delete" @click="deleteProduct(product)">
        Supprimer
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { Events } from '@/utils/events';
import { ProductInSelectedList } from '@/models/product';
import { ListModule } from '@/store/ListModule';

@Component
export default class DisplayProducts extends Vue {
  public listModule: ListModule = getModule(ListModule)

  @Prop()
  public products!: ProductInSelectedList[];

  deleteProduct(product: ProductInSelectedList) {
    this.listModule.deleteProductAction(product)
  }
}
</script>

<template>
  <ul v-if="products.length" id="list-products">
    <li v-for="product in products" :key="product.id">
      {{ product.name }}
      <button
        v-if="!isSelectedListArchived"
        class="delete"
        @click="deleteProduct(product)"
      >
        Supprimer
      </button>
      <input type="checkbox" @click.prevent="toggleBuyedProduct(product)" v-model="product.buyed">
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { Events } from '@/utils/events';
import { ProductInSelectedList } from '@/models/product';
import { ListModule } from '@/store/list/ListModule';
import { SetBuyedProductActionPayload } from '@/store/list/payloads'

@Component
export default class DisplayProducts extends Vue {
  public listModule: ListModule = getModule(ListModule)

  @Prop()
  public products!: ProductInSelectedList[];

  get isSelectedListArchived() {
    return this.listModule.isSelectedListArchived
  }

  deleteProduct(product: ProductInSelectedList) {
    this.listModule.deleteProductAction(product)
  }

  toggleBuyedProduct(product: ProductInSelectedList) {
    const setBuyedProductActionPayload: SetBuyedProductActionPayload = {
      product,
      buyed: !product.buyed,
    }
    this.listModule.setBuyedProductAction(setBuyedProductActionPayload)
  }
}
</script>

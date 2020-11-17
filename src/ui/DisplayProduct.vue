<template>
  <li :class="getBoughtClass">
    {{ product.name }}
    <template v-if="displayProductActions">
      <button
        class="delete"
        @click="deleteProduct"
      >
        Supprimer
      </button>
      <input
        type="checkbox"
        @click.prevent="toggleBoughtProduct"
        v-model="product.bought"
      >
    </template>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'

import { ProductInSelectedList } from '@/models/product'

@Component
export default class DisplayProducts extends Vue {
  @Prop()
  public product!: ProductInSelectedList

  @Prop({ type: Boolean, default: false })
  public isSelectedListArchived!: boolean

  get getBoughtClass() {
    return this.product.bought ? 'bought' : ''
  }

  get displayProductActions() {
    return !this.isSelectedListArchived
  }

  @Emit()
  public deleteProduct() {
    return this.product
  }

  @Emit()
  public toggleBoughtProduct() {
    return this.product
  }
}
</script>

<style scoped>
.bought {
 text-decoration: line-through;
}
</style>

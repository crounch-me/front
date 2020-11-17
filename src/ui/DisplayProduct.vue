<template>
  <li :class="getBoughtClass" @click.prevent="toggleBoughtProduct">
    {{ product.name }}
    <button
      class="delete"
      @click="deleteProduct"
      v-if="!isSelectedListArchived"
    >
      Supprimer
    </button>
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

  @Emit()
  public deleteProduct() {
    return this.product
  }

  @Emit()
  public toggleBoughtProduct() {
    if (this.isSelectedListArchived) {
      return
    }
    return this.product
  }
}
</script>

<style scoped>
.bought {
 text-decoration: line-through;
}
</style>

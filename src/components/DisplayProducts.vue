<template>
  <ul v-if="products.length" id="list-products">
    <DisplayProduct
      v-for="product in orderedProducts"
      :key="product.id"
      :product="product"
      :is-selected-list-archive="isSelectedListArchived"
      @delete-product="deleteProduct"
      @toggle-bought-product="toggleBoughtProduct"
    />
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import { Events } from '@/utils/events'
import { ProductInSelectedList } from '@/models/product'
import { ListModule } from '@/store/list/ListModule'
import { SetBoughtProductActionPayload } from '@/store/list/payloads'
import DisplayProduct from '@/ui/DisplayProduct.vue'

@Component({
  components: {
    DisplayProduct
  }
})
export default class DisplayProducts extends Vue {
  public listModule: ListModule = getModule(ListModule)

  @Prop()
  public products!: ProductInSelectedList[];

  get isSelectedListArchived() {
    return this.listModule.isSelectedListArchived
  }

  get orderedProducts () {
    const orderedProducts: ProductInSelectedList[] = []
    this.products.forEach(product => {
      if (product.bought) {
        orderedProducts.push(product)
      } else {
        orderedProducts.unshift(product)
      }
    })

    return orderedProducts
  }

  deleteProduct(product: ProductInSelectedList) {
    this.listModule.deleteProductAction(product)
  }

  toggleBoughtProduct(product: ProductInSelectedList) {
    const setBoughtProductActionPayload: SetBoughtProductActionPayload = {
      product,
      bought: !product.bought,
    }
    this.listModule.setBoughtProductAction(setBoughtProductActionPayload)
  }
}
</script>

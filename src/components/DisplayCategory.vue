<template>
  <div>
    <h3>{{ category.name }}</h3>
    <DisplayProducts
      :products="category.products"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

import DisplayProducts from '@/components/DisplayProducts.vue'
import { CategoryInSelectedList } from '@/models/category';

@Component({
  components: {
    DisplayProducts,
  }
})
export default class ListPage extends Vue {
  @Prop(String) readonly id!: string;

  @Prop()
  public category!: CategoryInSelectedList;

  // deleteProduct(productId: string) {
  //   deleteProductInList(productId, this.list!.id)
  //     .then(() => {
  //       const productIndex = this.list!.products.findIndex(product => product.id === productId)
  //       this.list!.products.splice(productIndex, 1)
  //     })
  // }

  // addProduct(product: Product) {
  //   addProductToList(product.id, this.id)
  //     .then(() => this.list!.products.push(product))
  //     .catch(err => {
  //       this.error = err.error
  //     })
  // }
}
</script>

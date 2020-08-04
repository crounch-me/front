<template>
  <div>
    <div v-if="this.list">
      <h1 id="list">{{ list.name }}</h1>
      <DisplayProducts :products="list.products" />
      <SearchProduct @add-product="addProduct" />
      <CreateProduct />
    </div>
    <h1 v-else>La liste n'a pas été trouvée</h1>
    {{ error }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import CreateProduct from '@/components/CreateProduct/CreateProduct.vue'
import SearchProduct from '@/components/SearchProduct/SearchProduct.vue'
import DisplayProducts from '@/components/DisplayProducts/DisplayProducts.vue'
import { readList, addProductToList } from '@/api/list';
import { Product } from '@/models/product';
import { List } from '@/models/list';

@Component({
  components: {
    CreateProduct,
    SearchProduct,
    DisplayProducts,
  }
})
export default class ListPage extends Vue {
  @Prop(String) readonly id!: string;

  private list: List | null = null
  private error = ''

  mounted() {
    readList(this.id)
      .then(list => {
        if (!list.products) {
          list.products = []
        }
        this.list = list
      })
      .catch(err => {
        this.error = err.error
      })
  }

  addProduct(product: Product) {
    addProductToList(product.id, this.id)
      .then(() => this.list!.products.push(product))
      .catch(err => {
        this.error = err.error
      })
  }
}
</script>

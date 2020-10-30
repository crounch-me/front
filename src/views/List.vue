<template>
  <div>
    <div v-if="this.list">
      <h1 id="list">{{ list.name }}</h1>
      <template v-for="category in list.categories">
        <DisplayCategory :category="category" :key="category.id" />
      </template>
      <SearchProduct @add-product="addProduct" :products-in-list="list.products" />
      <CreateProduct />
    </div>
    <h1 v-else>La liste n'a pas été trouvée</h1>
    {{ error }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

import { readList, addProductToList, deleteProductInList } from '@/api/list';
import CreateProduct from '@/components/CreateProduct.vue'
import DisplayProducts from '@/components/DisplayProducts.vue'
import SearchProduct from '@/components/SearchProduct.vue'
import DisplayCategory from '@/components/DisplayCategory.vue'
import { Product } from '@/models/product';
import { GetListResponse, List } from '@/models/list';

@Component({
  components: {
    CreateProduct,
    SearchProduct,
    DisplayCategory,
  }
})
export default class ListPage extends Vue {
  @Prop(String) readonly id!: string;

  private list: GetListResponse | null = null
  private error = ''

  mounted() {
    readList(this.id)
      .then(list => {
        if (!list.categories) {
          list.categories = []
        }
        this.list = list
      })
      .catch(err => {
        this.error = err.error
      })
  }
}
</script>

<template>
  <div>
    <div v-if="this.list">
      <h1 id="list">{{ list.name }}</h1>
      <template v-for="category in list.categories">
        <DisplayCategory v-if="category.products.length" :category="category" :key="category.id" />
      </template>
      <SearchProduct :products-in-list="list.products" />
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
import { SelectedList, List } from '@/models/list';
import { ListModule } from '@/store/ListModule';
import { getModule } from 'vuex-module-decorators';

@Component({
  components: {
    CreateProduct,
    SearchProduct,
    DisplayCategory,
  }
})
export default class ListPage extends Vue {
  public listModule: ListModule = getModule(ListModule)
  @Prop(String) readonly id!: string;

  get list() {
    return this.listModule.selectedList
  }

  private error = ''

  async mounted() {
    try {
      await this.listModule.selectList(this.id)
    } catch(err) {
      this.error = err.error
    }
  }
}
</script>

<template>
  <div>
    <div v-if="this.list">
      <h1 id="list">{{ list.name }}</h1>
      <template v-for="category in list.categories">
        <DisplayCategory v-if="category.products.length" :category="category" :key="category.id" />
      </template>
      <SearchProduct v-if="!isSelectedListArchived" :products-in-list="list.products" />
      <CreateProduct v-if="!isSelectedListArchived" />
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
import { ListModule } from '@/store/list/ListModule';
import { getModule } from 'vuex-module-decorators';
import { CategoryInSelectedList } from '@/models/category';
import { DEFAULT_CATEGORY_ID } from '@/utils/constants';

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

  get isSelectedListArchived() {
    return this.listModule.isSelectedListArchived
  }

  get sortedCategories(): CategoryInSelectedList[] {
    if (!this.list) {
      return []
    }
    const defaultCategoryIndex = this.list!.categories.findIndex(category => category.id === DEFAULT_CATEGORY_ID)
    const categories = [...this.list!.categories]

    if (defaultCategoryIndex !== -1) {
      const defaultCategory = categories[defaultCategoryIndex]
      categories.splice(defaultCategoryIndex, 1)
      categories.push(defaultCategory)
    }

    return categories
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

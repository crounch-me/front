<template>
  <div>
    <h3>{{ category.name }}</h3>
    <DisplayProducts :products="category.products" />
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
}
</script>

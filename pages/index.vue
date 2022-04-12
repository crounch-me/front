<template>
  <main>
    <section>
      <h1>Crounch App</h1>
      <input v-model="label" type="text">

      <ul>
        <li v-for="article of filteredArticles" :key="article.id">
          {{ article.label }}
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { Article } from '@/internal/article'

export default Vue.extend({
  data: () => ({
    label: ''
  }),
  async fetch () {
    await this.$store.dispatch('articles/init')
  },
  computed: {
    articles (): Article[] {
      return this.$store.getters['articles/all']
    },
    filteredArticles (): Article[] {
      if (!this.label) {
        return []
      }

      return this.articles.filter(article => article.label.includes(this.label))
    }
  }
})
</script>

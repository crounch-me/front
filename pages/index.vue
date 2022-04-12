<template>
  <main>
    <h1>Crounch App</h1>
    <ul>
      <li v-for="article of articles" :key="article.id">
        {{ article.label }}
      </li>
    </ul>
    <button @click="fetchArticles">
      Récupérer les articles
    </button>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { Article } from '@/internal/article'

export default Vue.extend({
  computed: {
    articles (): Article[] {
      return this.$store.getters['articles/all']
    }
  },

  methods: {
    async fetchArticles () {
      await this.$store.dispatch('articles/init')
    }
  }
})
</script>

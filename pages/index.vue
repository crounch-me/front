<template>
  <main>
    <section>
      <h1>Crounch App</h1>
      <input v-model="label" type="text">

      <ul>
        <li v-for="article of filteredArticles" :key="article.id">
          {{ article.label }}
          <button @click="addToBasket(article)">
            Ajouter à la liste
          </button>
        </li>
      </ul>
    </section>

    <section>
      <ul>
        <li v-for="article of basket.articles" :key="article.id">
          {{ article.label }}
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { StoreBasket, StoreBasketRepository } from '@/internal/basket/adapters/store'
import { StoreArticle } from '@/internal/article/entity'
import { BasketHandler } from '@/internal/basket/handler'

export default Vue.extend({
  data: () => ({
    label: 'e'
  }),
  async fetch () {
    await this.$store.dispatch('articles/init')
  },
  computed: {
    articles (): StoreArticle[] {
      return this.$store.getters['articles/all']
    },
    basket (): StoreBasket {
      return this.$store.getters['basket/get']
    },
    filteredArticles (): StoreArticle[] {
      if (!this.label) {
        return []
      }

      return this.articles.filter(article => article.label.includes(this.label))
    }
  },
  methods: {
    addToBasket (article: StoreArticle) {
      const basketStore = StoreBasketRepository.getInstance(this.$store)

      BasketHandler.addArticle(basketStore, this.basket, article)
    }
  }
})
</script>

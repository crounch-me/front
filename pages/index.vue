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
          <button @click="deleteFromBasket(article)">
            Supprimer de la liste
          </button>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { BasketData, BasketStoreRepository } from '@/internal/basket/adapters/store'
import { BasketHandler } from '@/internal/basket/handler'
import { BasketStoreKeys, formatBasketStoreKey } from '@/store/basket/keys'
import { ArticleData } from '@/internal/article/data'
import { ArticleStoreKeys, formatArticleStoreKey } from '@/store/articles/keys'

export default Vue.extend({
  data: () => ({
    label: 'e',
    basketStoreRepository: null as BasketStoreRepository | null,
    basketHandler: null as BasketHandler | null
  }),
  async fetch () {
    await this.$store.dispatch(formatArticleStoreKey(ArticleStoreKeys.actions.init))
  },
  computed: {
    articles (): ArticleData[] {
      return this.$store.getters[formatArticleStoreKey(ArticleStoreKeys.getters.all)]
    },
    basket (): BasketData {
      return this.$store.getters[formatBasketStoreKey(BasketStoreKeys.getters.get)]
    },
    filteredArticles (): ArticleData[] {
      if (!this.label) {
        return []
      }

      return (this.articles ?? []).filter(article =>
        article.label.includes(this.label) &&
        !this.basket.articles.some(a => a.id === article.id)
      )
    }
  },
  mounted () {
    this.basketStoreRepository = BasketStoreRepository.getInstance(this.$store)
    this.basketHandler = new BasketHandler(this.basketStoreRepository)
  },
  methods: {
    addToBasket (article: ArticleData) {
      this.basketHandler?.addArticle(this.basket, article)
    },
    deleteFromBasket (article: ArticleData) {
      this.basketHandler?.removeArticle(this.basket, article)
    }
  }
})
</script>

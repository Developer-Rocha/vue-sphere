<template>
  <div>
    <h1>Articles</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="articles.length">
      <li v-for="article in articles" :key="article.id">
        {{ article.attributes.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useArticleStore } from '../stores/articles'

const articleStore = useArticleStore()
const articles = computed(() => articleStore.articles)
const isLoading = computed(() => articleStore.isLoading)
const error = computed(() => articleStore.error)

onMounted(() => {
  articleStore.fetchArticles()
})
</script>

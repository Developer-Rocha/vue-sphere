import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticles } from '../../services/articleService'

export const useArticleStore = defineStore('articleStore', () => {
  const articles = ref([])
  const isLoading = ref(false)
  const error = ref('')

  async function fetchArticles() {
    isLoading.value = true
    error.value = ''

    try {
      const response = await getArticles()
      articles.value = response.data
    } catch (err) {
      error.value = 'Failed to load articles'
    } finally {
      isLoading.value = false
    }
  }

  return { articles, isLoading, error, fetchArticles }
})

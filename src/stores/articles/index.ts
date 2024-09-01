import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('articleStore', () => {
  const articles = ref([])
  const isLoading = ref(false)
  const error = ref('')


  return { articles, isLoading, error }
})

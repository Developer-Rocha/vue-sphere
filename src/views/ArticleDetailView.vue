<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <ArticleDetail v-if="article?.nid" :article="article" />
  <NotFound v-if="!article?.nid" />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetail from '@/components/ArticleDetail.vue'
import NotFound from '@/components/NotFound.vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ARTICLE_BY_ID } from '@/graphql/queries/getArticleById'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const currentLanguage = computed(() => configStore.currentLanguage)
const route = useRoute()
const articleId = ref(route.params.id)

const { loading, error, result, refetch } = useQuery(GET_ARTICLE_BY_ID, {
  nid: articleId,
  language: currentLanguage
})

watch([() => route.params.id, currentLanguage], ([newId, newLanguage]) => {
  articleId.value = newId
  refetch({ nid: newId, language: newLanguage })
})

const article = computed(() => result.value?.nodeById?.entityTranslation || {})
</script>

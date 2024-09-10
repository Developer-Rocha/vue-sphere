<template>
  <div v-if="loading">
    <SiteLoading />
  </div>
  <div v-if="error">{{ error }}</div>
  <ArticleDetail v-if="article?.nid" :article="article" />
  <NotFound v-if="!article?.nid" />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_ARTICLE } from '@/graphql/queries/getArticle'
import { useConfigStore } from '@/stores/config'
// Components.
import SiteLoading from '@/components/SiteLoading.vue'
import ArticleDetail from '@/components/ArticleDetail.vue'
import NotFound from '@/components/NotFound.vue'

const configStore = useConfigStore()
const currentLanguage = computed(() => configStore.currentLanguage)
const route = useRoute()
const articlePath = ref(addLeadingSlash(route.params.slug))

const { loading, error, result, refetch } = useQuery(GET_ARTICLE, {
  language: currentLanguage,
  path: articlePath
})

watch([() => route.params.slug, currentLanguage], ([newPath, newLanguage]) => {
  const updatedPath = addLeadingSlash(newPath)
  articlePath.value = updatedPath
  refetch({ language: newLanguage, path: updatedPath })
})

const article = computed(() => result.value?.nodeQuery?.entities[0].entityTranslation || {})

function addLeadingSlash(pathAlias) {
  return pathAlias.startsWith('/') ? pathAlias : `/${pathAlias}`
}
</script>

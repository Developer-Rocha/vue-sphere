<template>
  <div v-if="loading">
    <SiteLoading />
  </div>
  <div v-if="error">{{ error }}</div>
  <div v-if="data.fieldBanner" class="row tm-row">
    <div class="col-12">
      <hr class="tm-hr-primary tm-mb-55" />
      <img :src="data.fieldBanner.entity.fieldMediaImage.url" alt="Image" class="img-fluid" />
    </div>
  </div>
  <KeepAlive>
    <ParagraphsItems v-if="data.fieldParagraphs" :paragraphs="data.fieldParagraphs" />
  </KeepAlive>

  <div class="tm-mb-40">
    <h2>{{ $t('home.recent_articles') }}</h2>
  </div>
  <KeepAlive>
    <ArticleList :limit="2" />
  </KeepAlive>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_PAGE } from '@/graphql/queries/getPage'
import { useConfigStore } from '@/stores/config'
import { useSeoMeta } from '@unhead/vue'
// Componentes.
import ArticleList from '@/components/ArticleList.vue'
import ParagraphsItems from '@/components/paragraphs/ParagraphsItems.vue'
import SiteLoading from '@/components/SiteLoading.vue'

const route = useRoute()
const configStore = useConfigStore()
const currentLanguage = computed(() => configStore.currentLanguage)

const { loading, error, result, refetch } = useQuery(GET_PAGE, {
  id: '7',
  language: currentLanguage
})

const data = computed(() => result.value?.nodeById || {})

watch([() => currentLanguage], ([newLanguage]) => {
  refetch({ id: '7', language: newLanguage })
})

useSeoMeta({
  title: 'Blog Drupalizer - Homepage',
  canonical: 'https://blog.drupalizer.tech' + route.path,
  ogUrl: 'https://blog.drupalizer.tech' + route.path
})
</script>

<style scoped></style>

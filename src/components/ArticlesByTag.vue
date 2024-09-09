<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="data.length">
    <hr class="mb-3 tm-hr-primary" />
    <h2 class="tm-mb-40 tm-post-title tm-color-primary">{{ $t('article.related_posts') }}</h2>
    <RouterLink
      v-for="(article, index) in data"
      :key="index"
      class="d-block tm-mb-40"
      :to="{
        name: 'ArticleDetail',
        params: { slug: Helpers.removeLeadingSlash(article.entityTranslation.pathAlias) }
      }"
    >
      <figure>
        <img
          :src="article.entityTranslation.fieldImage.entity.fieldMediaImage.url"
          alt="Image"
          class="mb-3 img-fluid"
        />
        <figcaption class="tm-color-primary">{{ article.entityTranslation.title }}</figcaption>
      </figure>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_ARTICLES_BY_TAG } from '../graphql/queries/getArticlesByTag'
import { useConfigStore } from '@/stores/config'
import Helpers from '@/utils/helpers/global'

const configStore = useConfigStore()
const currentLanguage = computed(() => configStore.currentLanguage)
const currentLangcode = computed(() => configStore.currentLangcode)

const props = defineProps({
  nid: {
    type: String,
    required: true
  },
  termIds: {
    type: Array,
    required: true
  },
  limit: {
    type: Number,
    required: false,
    default: 10
  }
})

const tag = props.termIds.map((term) => String(term.targetId))
const nid = ref(props.nid)

const { loading, error, result, refetch } = useQuery(GET_ARTICLES_BY_TAG(tag), {
  nid: nid,
  termIds: tag,
  limit: props.limit,
  language: currentLanguage,
  langcode: currentLangcode
})

watch([() => nid, currentLanguage, currentLangcode], ([newId, newLanguage, newLangcode]) => {
  refetch({
    nid: newId,
    limit: props.limit,
    language: newLanguage,
    langcode: newLangcode
  })
})

const data = computed(() => result.value?.nodeQuery.entities || [])
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="data.length">
    <hr class="mb-3 tm-hr-primary">
    <h2 class="tm-mb-40 tm-post-title tm-color-primary">Related Posts</h2>
    <RouterLink
      v-for="article in data" :key="article.nid"
      class="d-block tm-mb-40"
      :to="{
        name: 'ArticleDetail',
        params: { id: article.nid }
      }"
    >
      <figure>
        <img :src="article.fieldImage.entity.fieldMediaImage.url" alt="Image" class="mb-3 img-fluid">
        <figcaption class="tm-color-primary">{{  article.title }}</figcaption>
      </figure>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_ARTICLES_BY_TAG } from '../graphql/queries/getArticlesByTag'

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

const tag = props.termIds.map(term => String(term.targetId));

const { loading, error, result, refetch } = useQuery(GET_ARTICLES_BY_TAG(tag), {
  nid: props.nid, 
  termIds: tag,
  limit: props.limit
})

watch(() => props.nid, (newId) => {
  refetch({ nid: newId, limit: props.limit }) 
})

const data = computed(() => result.value?.nodeQuery.entities || [])
</script>

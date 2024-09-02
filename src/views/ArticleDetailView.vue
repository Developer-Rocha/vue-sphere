<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <ArticleDetail v-if="article" :article="article" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router';
import ArticleDetail from '@/components/ArticleDetail.vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ARTICLE_BY_ID } from '@/graphql/queries/getArticleById'

const route = useRoute();
const articleId = route.params.id;

const { loading, error, result } = useQuery(GET_ARTICLE_BY_ID, {
  nid: articleId
})

const article = computed(() => result.value?.nodeById || {});
</script>

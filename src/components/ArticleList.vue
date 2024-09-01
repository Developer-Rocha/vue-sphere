<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="articles.length" class="row tm-row">
    <ArticleItem v-for="article in articles" :key="article.nid" :article="article" />
  </div>
</template>

<script setup>
import { computed, ref  } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_ARTICLES } from '../graphql/queries/getAllArticles';
import ArticleItem from './ArticleItem.vue';

const { loading, error, result } = useQuery(GET_ALL_ARTICLES);
const articles = computed(() => result.value?.nodeQuery.entities || []);

</script>

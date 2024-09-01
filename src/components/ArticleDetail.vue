<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>
        <h1>{{ article.title }}</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref  } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import {GET_ARTICLE_BY_ID} from '../graphql/queries/getArticleById';
  
  const props = defineProps({
    articleId: {
      type: String,
      required: true,
    }
  });
  
  const { loading, error, result } = useQuery(GET_ARTICLE_BY_ID, {
    variables: { nid: "1" },
  });

  const article = computed(() => result.value?.nodeById);

</script>
  
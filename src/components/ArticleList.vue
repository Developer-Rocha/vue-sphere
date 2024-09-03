<template>
  <div>
    <input v-if="props.search" v-model="searchTitle" placeholder="Search by title..." @input="fetchArticles" />
    
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="articles.length" class="row tm-row">
      <ArticleItem 
        v-for="(article, index) in articles" 
        :key="article.nid" 
        :article="article"
        :new="index <= 1" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_ARTICLES } from '../graphql/queries/getAllArticles'
import ArticleItem from './ArticleItem.vue'

const searchTitle = ref("");
const props = defineProps({
  tag: {
    type: String,
    required: false
  },
  search: {
    type: Boolean,
    required: false,
  },
  limit: {
    type: Number,
    required: false,
    default: 4
  }
});

const tag = props.tag ? props.tag : '';

const modifiedTitle = computed(() => {
  const titles = searchTitle.value.split(' ').map(title => `%${title}%`);
  return titles.join(' ');
});

const { loading, error, result, refetch } = useQuery(GET_ALL_ARTICLES(props.search, tag), {
  title: modifiedTitle.value,
  tag: tag,
  limit: props.limit
});

// Refetch articles when title changes.
watchEffect(() => {
  refetch({ title: modifiedTitle.value, tag: tag, limit: props.limit })
})

const articles = computed(() => result.value?.nodeQuery.entities || []);
</script>

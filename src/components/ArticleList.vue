<template>
  <div>
    <div v-if="props.search"  class="form-inline tm-mb-80 tm-search-form">
      <div class="wrap-search-input">
        <input 
          v-model="searchTitle" 
          placeholder="Search by title..." 
          @input="fetchArticles"
          class="form-control tm-search-input search-input"
        />
        <IconSearch size="30"/>
      </div>
    </div>
    
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
import { IconSearch } from '@tabler/icons-vue'

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

<style scoped>
.wrap-search-input {
  position: relative;
  display: block;
  margin-right: 30px;
  border-radius: 0;
  border-color: #0cc;
  font-size: 1.2rem;
}
.wrap-search-input svg{
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.wrap-search-input .search-input {
  width: 100%;
  height: 100%;
}
</style>

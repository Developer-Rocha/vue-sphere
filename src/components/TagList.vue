<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="tags.length">
    <hr class="mb-3 tm-hr-primary">
    <h2 class="mb-4 tm-post-title tm-color-primary">Categories</h2>
    <ul class="tm-mb-75 pl-5 tm-category-list">
      <li v-for="tag in tags" :key="tag.entityId">
        <a href="#" class="tm-color-primary">{{ tag.entityLabel }}</a>
      </li>
    </ul>
  </div>
  
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_TAGS } from '../graphql/queries/getAllTags'

const { loading, error, result } = useQuery(GET_ALL_TAGS)
const tags = computed(() => result.value?.taxonomyTermQuery.entities || [])
</script>
  
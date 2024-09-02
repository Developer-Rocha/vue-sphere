<template>
  <ul class="tm-mb-75 pl-5 tm-category-list">
    <li v-for="tag in tags" :key="tag.entityId">
      <a href="#" class="tm-color-primary">{{ tag.entityLabel }}</a>
    </li>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_TAGS } from '../graphql/queries/getAllTags'

const { result } = useQuery(GET_ALL_TAGS)
const tags = computed(() => result.value?.taxonomyTermQuery.entities || [])
</script>
  
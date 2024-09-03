<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="tags.length" :class="props.isFilter ? 'is-filter' : ''">
    <hr v-if="!props.isFilter" class="mb-3 tm-hr-primary" />
    <h2 v-if="!props.isFilter" class="mb-4 tm-post-title tm-color-primary">Categories</h2>
    <ul class="tm-mb-75 pl-5 tm-category-list">
      <li v-for="tag in tags" :key="tag.entityId">
        <RouterLink
          :class="
            route.query.tag && route.query.tag === tag.entityId
              ? 'active tm-color-primary'
              : 'tm-color-primary'
          "
          :to="{
            name: 'OverviewArticle',
            query: { tag: tag.entityId }
          }"
        >
          {{ tag.entityLabel }}
        </RouterLink>
      </li>
      <button
        v-if="props.isFilter"
        type="button"
        class="btn btn-primary"
        @click="$emit('remove-tag')"
      >
        Remove
      </button>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_TAGS } from '../graphql/queries/getAllTags'

const props = defineProps({
  isFilter: {
    type: Boolean,
    required: false
  }
})
const route = useRoute()
defineEmits(['remove-tag'])

const { loading, error, result } = useQuery(GET_ALL_TAGS)
const tags = computed(() => result.value?.taxonomyTermQuery.entities || [])
</script>

<style scoped>
.is-filter {
  display: flex;
  flex-flow: row-reverse;
  padding-right: 30px;
}

.is-filter .tm-category-list {
  display: flex;
}

.is-filter .tm-category-list li {
  margin-right: 15px;
}

.is-filter .tm-category-list li a.active {
  text-decoration: underline;
}
</style>

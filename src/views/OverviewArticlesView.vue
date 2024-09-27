<template>
  <ArticleList :tag="tag" :search="true" :limit="4" :show-pagination="true" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, useSeoMeta } from '@unhead/vue'
import ArticleList from '@/components/ArticleList.vue'

const route = useRoute()
const tag = ref(route.query.tag ? route.query.tag : '')

watch(
  () => route.query.tag,
  (newTag) => {
    tag.value = newTag ? newTag : ''
  }
)

useSeoMeta({
  title: 'Blog Drupalizer - Articles',
  canonical: 'https://blog.drupalizer.tech' + route.path,
  ogUrl: 'https://blog.drupalizer.tech' + route.path
})
</script>

<style scoped></style>

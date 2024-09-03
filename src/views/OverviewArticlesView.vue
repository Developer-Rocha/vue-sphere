<template>
  <ArticleList :tag="tag" :search="true" :limit="6" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import ArticleList from '@/components/ArticleList.vue'

const route = useRoute()
const tag = ref(route.query.tag ? route.query.tag : "")

watch(() => route.query.tag, (newTag) => {
  tag.value = newTag ? newTag : ""
})
</script>

<style scoped>

</style>

<template>
  <div class="articles">
    <ArticleList />
  </div>
</template>

<script setup lang="ts">
import ArticleList from '@/components/ArticleList.vue'
</script>

<style>
@media (min-width: 1024px) {
  .articles {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

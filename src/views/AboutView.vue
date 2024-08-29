<template>
  <div class="articles">
    <Articles />
  </div>
</template>

<script setup lang="ts">
import Articles from '@/components/ArticlesList.vue'
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

<template>
    <article class="col-12 col-md-6 tm-post">
        <hr class="tm-hr-primary" />
        <RouterLink :to="
        { 
            path: '/article-detail', 
            query: { id: article.nid } 
        }">
          <div class="tm-post-link-inner">
            <img :src="article.fieldImage.entity.fieldMediaImage.url" alt="Image" class="img-fluid" />
          </div>
          <span class="position-absolute tm-new-badge">New</span>
          <h2 class="tm-pt-30 tm-color-primary tm-post-title">{{ article.title }}</h2>
        </RouterLink>
        
        <p class="tm-pt-30">
          {{ article.fieldTeaser }}
        </p>
        <div class="d-flex justify-content-between tm-pt-45">
          <span v-for="tag in article.fieldTags" :key="tag.targetId" class="tm-color-primary">
            {{ tag.entity.name }}
          </span>
          <span class="tm-color-primary">
            {{ formatDate("1724875085") }}
          </span>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <span>by {{ article.entityOwner.name }}</span>
        </div>
      </article>
  </template>
<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  article: {
    type: Object,
    required: true,
  }
});

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000); 
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}
</script>

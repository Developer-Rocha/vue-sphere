<template>
  <article class="col-12 col-md-6 tm-post">
    <hr class="tm-hr-primary" />
    <RouterLink
      class="effect-lily tm-post-link tm-pt-60"
      :to="{
        name: 'ArticleDetail',
        params: { id: article.nid }
      }"
    >
      <div class="tm-post-link-inner">
        <img :src="article.fieldImage.entity.fieldMediaImage.url" alt="Image" class="img-fluid" />
      </div>
      <span v-if="new" class="position-absolute tm-new-badge">New</span>
      <h2 class="tm-pt-30 tm-color-primary tm-post-title">{{ article.title }}</h2>
    </RouterLink>

    <p class="tm-pt-30">
      {{ article.fieldTeaser }}
    </p>
    <div class="d-flex justify-content-between tm-pt-45">
      <div class="tags">
        <span
          v-for="(tag, index) in article.fieldTags"
          :key="tag.targetId"
          class="tm-color-primary"
        >
          {{ tag.entity.name }}
          <span v-if="index != Object.keys(article.fieldTags).length - 1">, </span>
        </span>
      </div>

      <span class="tm-color-primary">
        {{ formatDate(article.created) }}
      </span>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <span>by {{ article.entityOwner.name }}</span>
    </div>
  </article>
</template>
<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  new: {
    type: Boolean,
    required: false
  }
})

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
}
</script>

<style scoped></style>

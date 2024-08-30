<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="articles.length" class="row tm-row">
    <article v-for="article in articles" :key="article.id" class="col-12 col-md-6 tm-post">
      <hr class="tm-hr-primary" />
      <a href="post.html" class="effect-lily tm-post-link tm-pt-60">
        <div class="tm-post-link-inner">
          <img :src="article.relationships.field_image.data.url" alt="Image" class="img-fluid" />
        </div>
        <span class="position-absolute tm-new-badge">New</span>
        <h2 class="tm-pt-30 tm-color-primary tm-post-title">{{ article.attributes.title }}</h2>
      </a>
      <p class="tm-pt-30">
        {{ article.attributes.field_teaser }}
      </p>
      <div class="d-flex justify-content-between tm-pt-45">
        <span class="tm-color-primary">Travel . Events</span>
        <span class="tm-color-primary">June 24, 2020</span>
      </div>
      <hr />
      <div class="d-flex justify-content-between">
        <span>36 comments</span>
        <span>by Admin Nat</span>
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useArticleStore } from '../stores/articles'

const articleStore = useArticleStore()
const articles = computed(() => articleStore.articles)
const isLoading = computed(() => articleStore.isLoading)
const error = computed(() => articleStore.error)

onMounted(() => {
  articleStore.fetchArticles()
})

const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, '')
}
</script>

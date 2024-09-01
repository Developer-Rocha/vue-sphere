<template>
    <article class="col-12 col-md-6 tm-post">
        <hr class="tm-hr-primary" />
        <router-link :to="{ name: 'Article', params: { id: article.id } }">
          <div class="tm-post-link-inner">
            <img :src="article.relationships.field_image.data.url" alt="Image" class="img-fluid" />
          </div>
          <span class="position-absolute tm-new-badge">New</span>
          <h2 class="tm-pt-30 tm-color-primary tm-post-title">{{ article.attributes.title }}</h2>
        </router-link>
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
  </template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

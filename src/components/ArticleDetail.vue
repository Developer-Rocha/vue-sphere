<template>
  <div>
    <div class="row tm-row">
      <div class="col-12">
          <hr class="tm-hr-primary tm-mb-55">
          <img :src="article.fieldImage.entity.fieldMediaImage.url" alt="Image" class="img-fluid" /> 
      </div>
    </div>
    <div class="row tm-row">
      <div class="col-lg-8 tm-post-col">
        <div class="tm-post-full">                    
          <div class="mb-4">
              <h2 class="pt-2 tm-color-primary tm-post-title">{{  article.title }}</h2>
              <p class="tm-mb-40">{{ formatDate(article.created) }} posted by {{ article.entityOwner.name }}</p>
              <div v-html="article.body.value"></div>
              <span class="d-block text-right tm-color-primary">
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
              </span>
          </div>
        </div>
      </div>

      <aside class="col-lg-4 tm-aside-col">
        <div class="tm-post-sidebar">
          <hr class="mb-3 tm-hr-primary">
          <h2 class="mb-4 tm-post-title tm-color-primary">Categories</h2>
          <TagList />
          <hr class="mb-3 tm-hr-primary">
          <h2 class="tm-mb-40 tm-post-title tm-color-primary">Related Posts</h2>
          <!-- <a href="#" class="d-block tm-mb-40">
            <figure>
              <img src="img/img-02.jpg" alt="Image" class="mb-3 img-fluid">
              <figcaption class="tm-color-primary">Duis mollis diam nec ex viverra scelerisque a sit</figcaption>
            </figure>
          </a> -->
        </div>                    
    </aside>
    </div>
  </div>
</template>

<script setup>
import TagList from './TagList.vue';

const props = defineProps({
  article: {
    type: Object,
    required: true
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

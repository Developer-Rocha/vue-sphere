<template>
  <div v-if="article.title">
    <div class="row tm-row">
      <div class="col-12">
        <hr class="tm-hr-primary tm-mb-55" />
        <img
          v-if="article.fieldImage"
          :src="article.fieldImage.entity.fieldMediaImage.url"
          alt="Image"
          class="img-fluid article-banner"
        />
      </div>
    </div>
    <div class="row tm-row">
      <div class="col-lg-8 tm-post-col">
        <div class="tm-post-full">
          <div class="mb-4">
            <h2 class="pt-2 tm-color-primary tm-post-title">{{ article.title }}</h2>
            <p class="tm-mb-40">
              {{ Helpers.formatDate(article.created) }} {{ $t('article.written_by') }}
              {{ article.entityOwner.name }}
            </p>
            <div v-highlightjs v-html="article.body.value"></div>

            <ParagraphsItems :paragraphs="article.fieldParagraphs" />

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
          <TagList />
          <ArticlesByTag :nid="String(article.nid)" :termIds="article.fieldTags" :limit="6" />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import TagList from './TagList.vue'
import ArticlesByTag from './ArticlesByTag.vue'
import ParagraphsItems from './paragraphs/ParagraphsItems.vue'
import Helpers from '@/utils/helpers/global'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>
<style scoped>
.article-banner {
  margin-bottom: 40px;
}
</style>

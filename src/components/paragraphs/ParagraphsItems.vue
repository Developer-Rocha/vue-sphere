<template>
  <div v-for="(paragraph, index) in paragraphs" :key="index" class="paragraphs">
    <div v-if="paragraph.entity.__typename == 'ParagraphText'">
      <ParagraphText :paragraph="paragraph.entity" />
    </div>

    <div v-if="paragraph.entity.__typename == 'ParagraphTextWithImage'">
      <ParagraphTextWithImage :paragraph="paragraph.entity" />
    </div>

    <div v-if="paragraph.entity.__typename == 'ParagraphImage'">
      <ParagraphImage :paragraph="paragraph.entity" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ParagraphImage from './ParagraphImage.vue'
import ParagraphText from './ParagraphText.vue'
import ParagraphTextWithImage from './ParagraphTextWithImage.vue'

const props = defineProps({
  paragraphs: {
    type: Object,
    required: true
  }
})

const paragraphs = ref(props.paragraphs)

watch(
  () => props.paragraphs,
  (newVal) => {
    paragraphs.value = newVal
  }
)
</script>
<style scoped>
.paragraphs {
  margin: 40px 0;
}
</style>

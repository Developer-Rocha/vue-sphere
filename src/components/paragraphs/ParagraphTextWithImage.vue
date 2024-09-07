<template>
  <div v-if="paragraph" class="tm-mb-40">
    <img
      v-if="paragraph.fieldImage.entity"
      :src="paragraph.fieldImage.entity.fieldMediaImage.url"
      alt=""
      class="img-fluid article-banner"
    />
    <h2 v-if="paragraph.fieldTitle">{{ paragraph.fieldTitle }}</h2>
    <div v-if="paragraph.fieldText.value" v-html="paragraph.fieldText.value"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  paragraph: {
    type: Object,
    required: true
  }
})

const paragraph = ref(props.paragraph)

watch(
  () => props.paragraph,
  (newVal) => {
    paragraph.value = newVal
  }
)
</script>
<style scoped>
img {
  margin-bottom: 40px;
}
</style>

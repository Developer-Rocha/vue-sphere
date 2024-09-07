<template>
  <div v-if="paragraph" class="tm-mb-40">
    <img
      v-if="paragraph.fieldImage.entity"
      :src="paragraph.fieldImage.entity.fieldMediaImage.url"
      alt=""
      class="img-fluid article-banner"
    />
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
<style scoped></style>

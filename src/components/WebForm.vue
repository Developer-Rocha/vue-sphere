<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <form method="POST" action="" class="mb-5 ml-auto mr-0 tm-contact-form">
    <div v-for="element in webform" :key="element.id" class="form-group row mb-4">
      <label :for="element.id" class="col-sm-3 col-form-label text-right tm-color-primary">{{
        element.title
      }}</label>
      <div class="col-sm-9">
        <input
          v-if="
            element.type === 'textfield' || element.type === 'email' || element.type === 'phone'
          "
          class="form-control mr-0 ml-auto"
          :name="element.id"
          :id="element.id"
          :type="element.type"
          :required="element.required.message ? true : false"
        />

        <textarea
          v-if="element.type === 'textarea'"
          class="form-control mr-0 ml-auto"
          name="message"
          id="message"
          rows="8"
          :required="element.required.message ? true : false"
        ></textarea>
      </div>
    </div>

    <div class="form-group row text-right">
      <div class="col-12">
        <button class="tm-btn tm-btn-primary tm-btn-small">Submit</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_WEBFORM } from '../graphql/queries/getWebform'
import Tr from '@/i18n/translation'

const props = defineProps({
  webformId: {
    type: String,
    required: true
  }
})
const route = useRoute()

const { loading, error, result } = useQuery(GET_WEBFORM, {
  webform_id: props.webformId
})
const webform = computed(() => result.value?.webformById.elements || [])
</script>

<style scoped></style>

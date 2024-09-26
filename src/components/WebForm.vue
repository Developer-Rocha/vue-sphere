<template>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <form @submit.prevent="submitForm" class="mb-5 ml-auto mr-0 tm-contact-form">
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
          v-model="formData[element.id]"
          :name="element.id"
          :id="element.id"
          :type="element.type"
          required
        />

        <textarea
          v-if="element.type === 'textarea'"
          class="form-control mr-0 ml-auto"
          v-model="formData[element.id]"
          name="message"
          id="message"
          rows="8"
          required
        ></textarea>
      </div>
    </div>

    <div v-if="submitEnd" class="form-submit-response">
      <div v-if="errorSubmit" class="error">
        <ul>
          <li v-for="(error, index) in errorSubmit" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div v-if="!errorSubmit.length" class="success">
        <p>The form was submitted successfully!</p>
      </div>
    </div>

    <div class="form-group row text-right">
      <div class="col-12">
        <button class="tm-btn tm-btn-primary tm-btn-small" type="submit">Submit</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_WEBFORM } from '../graphql/queries/getWebform'
import { POST_WEBFORM } from '../graphql/mutations/postWebform'

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

const formData = ref({})
const submitEnd = ref(false)
const errorSubmit = ref([])

const { mutate: submitWebform, onDone, onError } = useMutation(POST_WEBFORM)

const submitForm = async () => {
  // Include the webform_id in the data.
  formData.value.webform_id = props.webformId

  // Convert the JSON in String before submit.
  const jsonString = JSON.stringify(formData.value)
  try {
    const response = await submitWebform({
      values: jsonString
    })

    if (response.data.submitForm.errors.length > 0) {
      errorSubmit.value = response.data.submitForm.errors
    } else {
      resetForm()
    }
    console.log('Form submitted: ', response)
    submitEnd.value = true
  } catch (error) {
    console.log('Error submitting form: ', error)
  }
}

const resetForm = () => {
  formData.value = {}
}
</script>

<style scoped>
.error ul li {
  color: red;
}

.success p {
  color: green;
}
</style>

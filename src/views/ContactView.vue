<template>
  <div v-if="contact_info[0]" class="row tm-row tm-mb-120">
    <div class="col-12">
      <h2 class="tm-color-primary tm-post-title tm-mb-60">
        {{ contact_info[contact_index].title }}
      </h2>
    </div>
    <div class="col-lg-7 tm-contact-left">
      <WebForm webformId="contact" />
    </div>
    <div class="col-lg-5 tm-contact-right">
      <address class="mb-4 tm-color-gray">
        {{ contact_info[contact_index].address.addressLine1 }},
        {{ contact_info[contact_index].address.postalCode }},
        {{ contact_info[contact_index].address.locality }}
      </address>
      <span class="d-block">
        Tel:
        <a :href="'tel:' + contact_info[contact_index].phone.value" class="tm-color-gray">{{
          contact_info[contact_index].phone.value
        }}</a>
      </span>
      <span class="mb-4 d-block">
        Email:
        <a :href="'mailto:' + contact_info[contact_index].email" class="tm-color-gray">{{
          contact_info[contact_index].email
        }}</a>
      </span>
      <div
        class="mb-5 tm-line-height-short"
        v-highlightjs
        v-html="contact_info[contact_index].text.value"
      ></div>
      <SocialNavigation />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_CONTACT_INFO } from '@/graphql/queries/getContactInfo'
import Tr from '@/i18n/translation'
import WebForm from '@/components/WebForm.vue'
import SocialNavigation from '@/components/SocialNavigation.vue'

const route = useRoute()
const currentLanguage = ref(Tr.currentLocale)
/*
 * contact_info receives two entites.
 * 1 - english version.
 * 2 - portuguese version.
 */
const contact_index = ref(currentLanguage.value === 'en' ? 0 : 1)

const { loading, error, result } = useQuery(GET_CONTACT_INFO)
const contact_info = computed(() => result.value?.configPagesQuery.entities || [])

watch(
  () => currentLanguage,
  (newVal) => {
    const newIndex = newVal == 'en' ? 0 : 1
    contact_index.value = newIndex
  }
)

useSeoMeta({
  title: 'Blog Drupalizer - Contact',
  canonical: 'https://blog.drupalizer.tech' + route.path,
  ogUrl: 'https://blog.drupalizer.tech' + route.path
})
</script>

<style scoped></style>

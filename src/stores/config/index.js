import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GET_LANGUAGES } from '../../graphql/queries/config/getLanguages'
import { useQuery } from '@vue/apollo-composable'

export const useConfigStore = defineStore('configStore', () => {
  const languages = ref([''])
  const currentLanguage = ref('EN')

  const { data } = useQuery(GET_LANGUAGES)

  languages.value.push({
    ...data.availableLanguages
  })
  return { languages, currentLanguage }
})

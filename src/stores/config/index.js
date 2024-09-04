import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('configStore', {
  state: () => ({
    languages: [
      { code: 'EN', language: 'EN' },
      { code: 'PT_BR', language: 'PT' }
    ],
    currentLanguage: 'EN'
  }),
  actions: {
    switchLanguage(language) {
      this.currentLanguage = language
    }
  }
})

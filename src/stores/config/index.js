import { defineStore } from 'pinia'

export const useConfigStore = defineStore('configStore', {
  state: () => ({
    languages: [
      { code: 'EN', language: 'EN' },
      { code: 'PT_BR', language: 'PT' }
    ],
    currentLanguage: 'EN',
    currentLangcode: 'en'
  }),
  actions: {
    switchLanguage(language) {
      this.currentLanguage = language
      if (language === 'PT_BR') {
        this.currentLangcode = 'pt-br'
      } else {
        this.currentLangcode = 'en'
      }
    }
  }
})

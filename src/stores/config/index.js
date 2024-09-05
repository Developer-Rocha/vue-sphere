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
      if (language === 'pt') {
        this.currentLanguage = 'PT_BR'
        this.currentLangcode = 'pt-br'
      } else {
        this.currentLanguage = 'EN'
        this.currentLangcode = 'en'
      }
    }
  }
})

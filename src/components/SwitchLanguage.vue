<template>
  <div class="language-switch">
    <select class="language-selector" @change="switchLanguage">
      <option
        v-for="sLocale in supportedLocales"
        :key="`locale-${sLocale}`"
        :value="sLocale"
        :selected="locale === sLocale"
      >
        {{ t(`locale.${sLocale}`) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useConfigStore } from '@/stores/config'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Tr from '@/i18n/translation'

const { t, locale } = useI18n()
const supportedLocales = Tr.supportedLocales
const router = useRouter()
const configStore = useConfigStore()

const switchLanguage = async (event) => {
  const newLocale = event.target.value

  await Tr.switchLanguage(newLocale)

  try {
    await router.replace({ params: { locale: newLocale } })
    configStore.switchLanguage(newLocale)
    // Redirect to home when switch language.
    router.push({ name: 'home' })
  } catch (e) {
    console.log(e)
    router.push('/')
  }
}
</script>

<style scoped>
.language-switch {
  margin: 30px 0;
}

.language-selector {
  background: transparent;
  border: none;
  color: #fff;
  outline: none;
}

.language-selector option {
  background: #a299ae;
  color: #fff;
}
</style>

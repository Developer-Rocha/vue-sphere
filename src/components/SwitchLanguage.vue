<template>
  <div class="language-switch">
    <select @change="switchLanguage">
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
import { ref, computed, watch } from 'vue'
import { useConfigStore } from '@/stores/config'
import { useRoute, useRouter } from 'vue-router'
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
  } catch (e) {
    console.log(e)
    router.push('/')
  }
}
</script>

<style scoped>
.language-switch {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.switch-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.switch-label input[type='radio'] {
  margin-right: 5px;
}

.switch-label span {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.switch-label input[type='radio']:checked + span {
  color: #42b983;
}
</style>

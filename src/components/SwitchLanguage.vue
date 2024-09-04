<template>
  <div class="language-switch">
    <label v-for="language in languages" :key="language.code" class="switch-label">
      <input
        type="radio"
        name="language"
        :value="language.code"
        v-model="selectedLanguage"
        @change="switchLanguage"
      />
      <span>{{ language.language }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const languages = computed(() => configStore.languages)
const selectedLanguage = ref(configStore.currentLanguage)

const switchLanguage = () => {
  configStore.switchLanguage(selectedLanguage.value)
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

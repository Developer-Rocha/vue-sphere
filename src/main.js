import '@/assets/bootstrap.min.css'
import '@/scss/theme.scss'
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import apolloClient from './apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import i18n from './i18n'
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/default.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueHighlightJS)

app.mount('#app')

import '@/assets/bootstrap.min.css'
import '@/scss/theme.scss'
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import router from './router'
import apolloClient from './apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import i18n from './i18n'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import VueHoneypot from 'vue-honeypot'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.directive('highlightjs', {
  beforeMount(el) {
    const codeBlocks = el.querySelectorAll('pre code')
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block)
    })
  },
  updated(el) {
    const codeBlocks = el.querySelectorAll('pre code')
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block)
    })
  }
})

const head = createHead()

app.use(createPinia())
app.use(VueHoneypot)
app.use(router)
app.use(i18n)
app.use(head)

app.mount('#app')

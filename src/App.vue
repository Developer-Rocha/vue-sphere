<template>
  <header :class="[showMenu ? 'show' : '', 'tm-header']" id="tm-header">
    <div class="tm-header-wrapper">
      <SwitchLanguage />
      <button
        class="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        @click="toggleMenu()"
      >
        <IconMenu2 size="25" />
      </button>
      <div class="tm-site-header">
        <div class="mb-3 mx-auto tm-site-logo">
          <IconBrandDrupal size="50" />
        </div>
        <h1 class="text-center">Vue Sphere</h1>
      </div>
      <MainNavigation />

      <SocialNavigation />
    </div>
  </header>
  <div class="container-fluid">
    <main class="tm-main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>

      <SiteFooter />
    </main>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { IconMenu2, IconBrandDrupal } from '@tabler/icons-vue'
import { useHead, useSeoMeta } from '@unhead/vue'
// components
import MainNavigation from './components/MainNavigation.vue'
import SocialNavigation from './components/SocialNavigation.vue'
import SwitchLanguage from './components/SwitchLanguage.vue'
import SiteFooter from './components/SiteFooter.vue'

const showMenu = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

useHead({
  title: 'Blog Drupalizer',
  meta: [
    {
      name: 'description',
      content:
        'A constructive and inclusive social network for software developers. With you every step of your journey.'
    }
  ]
})

useSeoMeta({
  canonical: 'https://blog.drupalizer.tech/',
  ogTitle: 'Blog Drupalizer',
  ogDescription:
    'A constructive and inclusive social network for software developers. With you every step of your journey.',
  ogUrl: 'https://blog.drupalizer.tech/'
})
</script>
<style scoped>
.tm-site-logo svg {
  color: #0678be;
}
</style>

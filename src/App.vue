<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { IconMenu2, IconBrandDrupal } from '@tabler/icons-vue'
// components
import MainNavigation from './components/MainNavigation.vue'
import SocialNavigation from './components/SocialNavigation.vue'
import SwitchLanguage from './components/SwitchLanguage.vue'

const showMenu = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <header :class="[showMenu ? 'show' : '', 'tm-header']" id="tm-header">
    <div class="tm-header-wrapper">
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
      <SwitchLanguage />
      <SocialNavigation />
    </div>
  </header>
  <div class="container-fluid">
    <main class="tm-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.tm-site-logo svg {
  color: #0678be;
}
</style>

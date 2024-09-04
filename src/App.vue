<script setup>
import { RouterView } from 'vue-router'
// components
import MainNavigation from './components/MainNavigation.vue'
import SocialNavigation from './components/SocialNavigation.vue'
import SwitchLanguage from './components/SwitchLanguage.vue'
</script>

<template>
  <header class="tm-header" id="tm-header">
    <div class="tm-header-wrapper">
      <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="tm-site-header">
        <div class="mb-3 mx-auto tm-site-logo"><i class="fas fa-times fa-2x"></i></div>
        <h1 class="text-center">Vue Sphere</h1>
      </div>
      <SwitchLanguage />
      <MainNavigation />
      <SocialNavigation />
    </div>
  </header>
  <div class="container-fluid">
    <main class="tm-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>

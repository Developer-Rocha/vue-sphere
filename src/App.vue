<script setup>
import { RouterLink, RouterView } from 'vue-router'
import FirstNavigation from '@/components/FirstNavigation.vue'
</script>

<template>
  <header>
    <FirstNavigation />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
@import '@/scss/theme.scss';
</style>

<template>
  <nav class="tm-nav" id="tm-nav">
    <ul>
      <li class="tm-nav-item">
        <RouterLink to="/" activeClass="active" class="tm-nav-link">
          <IconHomeFilled size="30" />
          Home
        </RouterLink>
      </li>
      <li class="tm-nav-item">
        <RouterLink to="/article-overview" activeClass="active" class="tm-nav-link">
          <IconArticleFilled size="30" />
          Articles
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { IconHomeFilled, IconArticleFilled } from '@tabler/icons-vue'
</script>
<style scoped></style>

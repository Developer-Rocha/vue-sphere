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
        <RouterLink to="/about" activeClass="active" class="tm-nav-link">
          <IconUserFilled size="30" />
          About
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { IconHomeFilled, IconUserFilled } from '@tabler/icons-vue'
</script>
<style scoped></style>

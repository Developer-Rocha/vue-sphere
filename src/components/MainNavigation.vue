<template>
  <nav class="tm-nav" id="tm-nav">
    <ul>
      <li class="tm-nav-item">
        <RouterLink :to="Tr.i18nRoute({ name: 'home' })" activeClass="active" class="tm-nav-link">
          <IconHomeFilled size="30" />
          {{ $t('nav.home') }}
        </RouterLink>
      </li>
      <li class="tm-nav-item">
        <RouterLink
          :to="Tr.i18nRoute({ name: 'Article' })"
          activeClass="active"
          class="tm-nav-link"
        >
          <IconArticleFilled size="30" />
          {{ $t('nav.articles') }}
        </RouterLink>
      </li>
      <li class="tm-nav-item">
        <RouterLink
          :to="Tr.i18nRoute({ name: 'Contact' })"
          activeClass="active"
          class="tm-nav-link"
        >
          <IconBrandHipchat size="30" />
          {{ $t('nav.contact') }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { IconHomeFilled, IconArticleFilled, IconBrandHipchat } from '@tabler/icons-vue'
import Tr from '@/i18n/translation'
</script>
<style scoped></style>

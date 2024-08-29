<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" width="70" alt="" />
      </a>
      <div class="socials">
        <AwesomeSocialButton type="facebook" :link="{ src: 'https://facebook.com' }" />
        <AwesomeSocialButton type="linkedin" :link="{ src: 'https://linkedin.com' }" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { AwesomeSocialButton } from 'awesome-social-button'
</script>
<style scoped>
.awesome-social-button {
  display: inline-block;
  margin: 0 5px;
}
</style>

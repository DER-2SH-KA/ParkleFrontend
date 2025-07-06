<script setup lang="ts">
import FooterComponent from './FooterComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <FooterComponent id="footer-component" />
</template>

<style lang="scss">
#footer-component {
  position: sticky;
  bottom: 0;
  flex: 0 0 auto;
}
</style>

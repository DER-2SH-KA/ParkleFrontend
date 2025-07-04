<script setup lang="ts">
import FooterComponent from './FooterComponent.vue'
import GeneralPage from './GeneralPage.vue'
import HeaderComponent from './HeaderComponent.vue'
</script>

<template>
  <HeaderComponent class="header-component" />
  <GeneralPage id="main-component" />
  <FooterComponent class="footer-component" />
</template>

<style lang="scss">
body {
  /*background-color: cyan;*/
  background-color: var(--background-color-dark-theme);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-component {
  flex: 1 0 auto;
}

.footer-component {
  flex: 0 0 auto;
}
</style>

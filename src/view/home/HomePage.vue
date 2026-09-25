<script setup lang="ts">
import HomePageMain from './HomePageContent.vue'
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
</script>

<template>
  <HeaderComponent class="header-component" />
  <HomePageMain class="main-component" />
  <FooterComponent class="footer__footer-component" />
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

.header-component {
  position: sticky;
  top: 0;
}

.main-component {
  flex: 1 0 auto;
  margin: 20px 0px;
}
</style>

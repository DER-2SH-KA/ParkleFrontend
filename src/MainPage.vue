<script setup lang="ts">
import GeneralPage from './GeneralPage.vue'
import HeaderComponent from './HeaderComponent.vue'
</script>

<template>
  <HeaderComponent class="header-component" />
  <GeneralPage class="main-component" />
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

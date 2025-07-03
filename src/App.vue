<script setup lang="ts">
import FooterComponent from './FooterComponent.vue'
import GeneralPage from './GeneralPage.vue'
import HeaderComponent from './HeaderComponent.vue'
</script>

<template>
  <HeaderComponent id="headerComponent" />
  <GeneralPage id="mainComponent" />
  <FooterComponent id="footerComponent" />
</template>

<style lang="scss">
body {
  background-color: cyan;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#mainComponent {
  flex: 1 0 auto;
}

#footerComponent {
  flex: 0 0 auto;
}
</style>

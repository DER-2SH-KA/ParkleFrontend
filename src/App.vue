<script setup lang="ts">
import { onMounted } from 'vue'
import FooterComponent from './subComponents/FooterComponent.vue'
import { RouterView } from 'vue-router'
import { ping } from './scripts/api/userApi'
import { showAlert } from './scripts/createToasts'
import { TYPE } from 'vue-toastification'

onMounted(async () => {
  await ping()
    .then(() => {
      showAlert('Сервер готов к работе!', TYPE.SUCCESS)
    })
    .catch(() => {
      showAlert('Сервер не готов к работе!', TYPE.WARNING)
    })
})
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

.no-select {
  user-select: none;
}
</style>

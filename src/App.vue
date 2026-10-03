<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { ping } from './scripts/api/userApi'
import { showAlert } from './scripts/createToasts'
import { TYPE } from 'vue-toastification'
import HeaderComponent from './view/header/HeaderComponent.vue'
import FooterComponent from './view/footer/FooterComponent.vue'

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
  <v-app>
    <header-component v-if="!$route.meta.hideHeader" />

    <v-main>
      <router-view />
    </v-main>

    <footer-component />
  </v-app>
</template>

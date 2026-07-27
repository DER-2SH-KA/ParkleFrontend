<script setup lang="ts">
import { onMounted } from 'vue'
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
  <RouterView id="body__router-view" />
</template>

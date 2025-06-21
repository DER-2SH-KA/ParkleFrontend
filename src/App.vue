<script setup lang="ts">
import { useToast } from 'vue-toastification'

const iAmAToast = () => {
  const toast = useToast()

  toast.success('My toast content')

  return { toast }
}
</script>

<template>
  <button @click="iAmAToast">I am a toast!</button>
</template>

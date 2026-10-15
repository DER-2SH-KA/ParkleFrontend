<script setup lang="ts">
import { chooseRandomStringItemFromList } from '../../scripts/utils'
import { ref, onMounted } from 'vue'

const welcomePhrases = [
  'Давно не виделись!',
  'Рад тебя видеть!',
  'Добро пожаловать!',
  'Привет!',
  'Здравствуйте!',
]
const welcomePhrase = ref<string>('')

const setRandomWelcomePhrase = () => {
  let welcomeRandomPhrase = ''
  do {
    welcomeRandomPhrase = chooseRandomStringItemFromList(welcomePhrases)
  } while (welcomeRandomPhrase === welcomePhrase.value)
  welcomePhrase.value = welcomeRandomPhrase
}

onMounted(() => {
  setRandomWelcomePhrase()
})
</script>

<template>
  <p class="text-center" @click="setRandomWelcomePhrase()">
    <b>{{ welcomePhrase }}</b>
  </p>
</template>

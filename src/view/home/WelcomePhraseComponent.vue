<script setup lang="ts">
import { chooseRandomStringItemFromList } from '../../scripts/utils'
import { ref, onMounted } from 'vue'

const welcomePhrases = ['Рад тебя видеть!', 'Добро пожаловать!', 'Привет!', 'Приветствую!']
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
  <p class="welcome-phrase" @click="setRandomWelcomePhrase()">
    <b>{{ welcomePhrase }}</b>
  </p>
</template>

<style lang="css" scoped>
.welcome-phrase {
  font-size: 22pt;
  text-align: center;

  &::first-letter {
    font-size: 24pt;
    color: rgb(var(--v-theme-primary));
  }
}
</style>

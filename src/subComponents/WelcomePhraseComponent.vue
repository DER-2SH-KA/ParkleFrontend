<script setup lang="ts">
import { chooseRandomStringItemFromList } from '../scripts/utils'
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
  <p id="welcome-phrase" class="no-select" @click="setRandomWelcomePhrase()">
    <b>{{ welcomePhrase }}</b>
  </p>
</template>

<style lang="scss" scoped>
#welcome-phrase {
  color: var(--text-color-dark-theme);
  border: 3px transparent solid;
  text-align: center;
  font-size: 34pt;
  padding: 10px 20px;

  &::first-letter {
    color: #6f00ff;
  }
}

@media (max-width: 768px) {
  #welcome-phrase {
    font-size: 32pt;
  }
}
</style>

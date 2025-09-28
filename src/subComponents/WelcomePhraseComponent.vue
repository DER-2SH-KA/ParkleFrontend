<script setup lang="ts">
import { chooseRandomStringItemFromList } from '../scripts/utils'
import { ref, onMounted } from 'vue'

const welcomePhrases = [
  'Long Time No See!',
  "I'm Glad To See You!",
  'Welcome Back!',
  'Hello!',
  'Hi!',
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
  <p id="welcome-phrase" @click="setRandomWelcomePhrase()">
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

  &:hover {
    border-radius: 20px;
    animation: outline 100ms ease-out forwards;
  }
}

@media (max-width: 768px) {
  #welcome-phrase {
    font-size: 32pt;
  }
}

@keyframes outline {
  to {
    border: 3px var(--text-color-dark-theme) solid;
  }
}
</style>

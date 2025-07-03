<script setup lang="ts">
import { chooseRandomStringItemFromList } from '../scripts/utils'
import { ref, onMounted } from 'vue'

const welcomePhrases = [
  'Добро Пожаловать!',
  'Давно Не Виделись!',
  'Я Рад Тебя Видеть!',
  'С Возвращением!',
  'Welcome Back!',
  'おはよう!',
  'おかえりなさい!',
  '大家好!',
  '欢迎',
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
  text-align: center;
  font-size: 32pt;
  padding: 10px 20px;
  border: 3px transparent solid;

  &::first-letter {
    color: #6f00ff;
  }

  &:hover {
    border-radius: 20px;
    animation: outline 100ms ease-out forwards;
  }
}

@keyframes outline {
  to {
    border: 3px var(--text-color-dark-theme) solid;
  }
}
</style>

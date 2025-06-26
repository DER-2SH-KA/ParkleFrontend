<script setup lang="ts">
import { TYPE } from 'vue-toastification'
import { showAlert } from './scripts/createToasts.ts'
import { ref } from 'vue'

const textFieldValue = ref<string>('')
</script>

<template>
  <v-text-field
    v-model="textFieldValue"
    label="Some text"
    hint="Place some text there"
    placeholder="Some text"
    type="input"
  ></v-text-field>
  <button @click="showAlert(textFieldValue, TYPE.SUCCESS)">Show Toast</button>
</template>

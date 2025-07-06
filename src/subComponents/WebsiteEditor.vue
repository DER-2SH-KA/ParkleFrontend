<script lang="ts" setup>
import { ref } from 'vue'
const model = defineModel<boolean>()

const title = ref<string>()
const description = ref<string>()
const url = ref<string>()
const hex = ref<string>()
</script>

<template>
  <VDialog id="website-editor" v-model="model">
    <VCol id="website-editor-items">
      <VTextField v-model="title" :single-line="true" label="Title" style="color: white" block />
      <VTextField v-model="description" label="Description" style="color: white" block />
      <VTextField v-model="url" :single-line="true" label="URL" style="color: white" block />
      <VTextField
        v-model="hex"
        :single-line="true"
        label="HEX style (with &sharp;):"
        style="color: white"
        block
      />
      <div id="show-hex-color" :style="`background-color: ${hex};`"></div>
      <VBtn block>SAVE</VBtn>
      <VBtn block>CANCEL</VBtn>
    </VCol>
  </VDialog>
</template>

<style lang="scss">
#website-editor {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
}

#website-editor-items {
  background-color: var(--background-second-color-dark-theme);
  border-radius: 20px;
  margin: 20px;
}

#show-hex-color {
  border-radius: 10px;
  height: 5vh;
  width: 100px;
  margin: 5px;
}
</style>

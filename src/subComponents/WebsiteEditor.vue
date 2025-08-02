<script lang="ts" setup>
import type { WebsiteCreateDto } from '@/scripts/declaration'
import { ref } from 'vue'
import { createWebsite } from '@/scripts/api'
import { useCurrentUserStore, useWebsitesStore } from '@/scripts/stores/piniaStore'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'

const model = defineModel<boolean>()

const currentUserStore = useCurrentUserStore()
const websitesStore = useWebsitesStore()

const loading = ref<boolean>(false)

const title = ref<string>('')
const description = ref<string>('')
const url = ref<string>('')
const hex = ref<string>('')

const isFormValid = ref<boolean | null>(null)

const regexpUrl: RegExp = new RegExp('^#([a-zA-Z0-9]{3}|[a-zA-Z0-9]{6})$')
const rules = {
  title: [
    (v: string) => {
      if (!!v.trim()) return true

      return 'Title is required'
    },
    (v: string) => {
      if (v.trim().length <= 100) return true

      return "Title's length must be lower than 100 symbols"
    },
  ],

  description: [
    (v: string) => {
      if (v.trim().length <= 255) return true

      return "Description's length must be lower than 255 symbols"
    },
  ],

  url: [
    (v: string) => {
      if (!!v.trim()) return true

      return 'URL is required'
    },
  ],

  hex: [
    (v: string) => {
      if (!!v.trim()) return true

      return 'HEX value is required'
    },
    (v: string) => {
      if (regexpUrl.test(v.trim())) return true

      return "HEX value must be as '#fff' or '#ffffff' fromat"
    },
  ],
}

/* eslint-disable @typescript-eslint/no-unused-vars */
async function createWebsiteFromAddDialog(event: Event) {
  console.log('I am called!')
  loading.value = true

  const websiteCreateDto: WebsiteCreateDto = {
    userId: currentUserStore.currentUser?.id ? currentUserStore.currentUser.id : '',
    title: title.value ? title.value : '',
    description: description.value,
    url: url.value ? url.value : '',
    hexColor: hex.value ? hex.value : '',
  }

  await createWebsite(websiteCreateDto)
    .then((result) => {
      if (!!result) {
        websitesStore.websites.push(result)
        console.info('Website was created', result)
        showAlert('Website was added', TYPE.SUCCESS)
        model.value = false
      }
    })
    .catch((error) => {
      console.error('crateWebsite', error)
      showAlert("Website wasn't created", TYPE.ERROR)
    })

  clearFields()
  loading.value = false
}

function cancel() {
  model.value = false
  clearFields()
}

function clearFields() {
  title.value = ''
  description.value = ''
  url.value = ''
  hex.value = ''
}
</script>

<template>
  <VDialog id="website-editor-dialog" v-model="model">
    <VForm
      id="website-editor"
      v-model="isFormValid"
      validate-on="input"
      @submit.prevent="createWebsiteFromAddDialog"
    >
      <VCol id="website-editor-items">
        <VTextField
          v-model="title"
          :rules="rules.title"
          :single-line="true"
          label="Title"
          style="color: white"
          block
        />
        <VTextField
          v-model="description"
          :rules="rules.description"
          label="Description"
          style="color: white"
          block
        />
        <VTextField
          v-model="url"
          :rules="rules.url"
          :single-line="true"
          label="URL"
          style="color: white"
          block
        />
        <VTextField
          v-model="hex"
          :rules="rules.hex"
          :single-line="true"
          label="HEX color of first title letter (with #):"
          style="color: white"
          block
        />
        <div id="show-hex-color" :style="`background-color: ${hex};`"></div>
        <VBtn :loading="loading" :disabled="!isFormValid" text="Save" type="submit" block />
        <VBtn @click="cancel()" text="Cancel" block />
      </VCol>
    </VForm>
  </VDialog>
</template>

<style lang="scss">
#website-editor-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  max-width: 700px;
}

#website-editor {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  max-width: 700px;
}

#website-editor-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--background-second-color-dark-theme);
  border-radius: 20px;
  padding: 20px;
}

#show-hex-color {
  border-radius: 10px;
  height: 5vh;
  width: 100px;
  margin: 5px;
}

@media (max-width: 768px) {
  #website-editor {
    max-width: 90%;
  }
}
</style>

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

const title = ref<string>()
const description = ref<string>()
const url = ref<string>()
const hex = ref<string>()

const createWebsiteFromAddDialog = async () => {
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
}
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
      <VBtn @click="createWebsiteFromAddDialog()" text="Save" block />
      <VBtn @click="model = false" text="Cancel" block />
    </VCol>
  </VDialog>
</template>

<style lang="scss">
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

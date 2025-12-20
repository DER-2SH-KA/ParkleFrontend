<script lang="ts" setup>
import type { WebsiteCreateDto, WebsiteResponseDto, WebsiteUpdateDto } from '@/scripts/declaration'
import { onMounted, ref } from 'vue'
import { createWebsite, updateWebsiteById } from '@/scripts/api'
import { useCurrentUserStore, useWebsitesStore } from '@/scripts/stores/piniaStore'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'

const model = defineModel<boolean>()

const props = defineProps<{
  website: WebsiteResponseDto | undefined
}>()

const currentUserStore = useCurrentUserStore()
const websitesStore = useWebsitesStore()

const loading = ref<boolean>(false)

const title = ref<string>('')
const description = ref<string>('')
const url = ref<string>('')
const hex = ref<string>('#')

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
async function saveWebsiteFromAddDialog(event: Event) {
  loading.value = true

  if (props.website === undefined) {
    console.info('Starting submiting and send create website!')

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

          clearFields()
          model.value = false
        }
      })
      .catch((error) => {
        console.error('crateWebsite', error)
        showAlert("Website wasn't created", TYPE.ERROR)
      })
  } else {
    console.info('Starting submiting and send update website!')

    const websiteUpdateDto: WebsiteUpdateDto = {
      userId: props.website.userId,
      title: title.value,
      description: description.value ?? '',
      url: url.value,
      hexColor: hex.value,
    }

    await updateWebsiteById(props.website.id, websiteUpdateDto)
      .then((result) => {
        if (!!result) {
          const websiteToUpdate: WebsiteResponseDto | undefined = websitesStore.websites.find(
            (w) => w == props.website,
          )

          if (websiteToUpdate !== undefined) {
            websiteToUpdate.title = title.value
            websiteToUpdate.description = description.value ?? ''
            websiteToUpdate.url = url.value
            websiteToUpdate.hexColor = hex.value
          }

          console.info('Website was updated!', result)
          showAlert('Website was updated!', TYPE.SUCCESS)

          fillFields()
          model.value = false
        }
      })
      .catch((err) => {
        console.error('crateWebsite', err)
        showAlert("Website wasn't created", TYPE.ERROR)
      })
  }
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

function fillFields() {
  if (props.website !== undefined) {
    title.value = props.website.title
    description.value = props.website.description ?? ''
    url.value = props.website.url
    hex.value = props.website.hexColor
  } else {
    clearFields()
  }
}

onMounted(() => {
  fillFields()
})
</script>

<template>
  <v-dialog id="website-editor-dialog" v-model="model">
    <VForm
      class="pa-0 ma-0"
      v-model="isFormValid"
      validate-on="input"
      @submit.prevent="saveWebsiteFromAddDialog"
    >
      <v-container id="website-editor">
        <v-row id="website-editor-items" class="pa-0 ma-0">
          <v-col class="pb-0 ma-0" cols="12">
            <!-- Dialog title -->
            <p style="color: white; text-align: center; font-size: 16pt"><strong>Сайт</strong></p>
          </v-col>

          <v-col class="py-0 ma-0" cols="12">
            <!-- Website title -->
            <VTextField
              v-model="title"
              :rules="rules.title"
              placeholder="Название..."
              type="text"
              variant="solo"
              bg-color="#23232A"
              style="color: white"
              rounded="lg"
              required
            />
          </v-col>

          <v-col class="py-0 ma-0" cols="12">
            <!-- Description -->
            <VTextField
              v-model="description"
              :rules="rules.description"
              placeholder="Описание..."
              type="text"
              variant="solo"
              bg-color="#23232A"
              style="color: white"
              rounded="lg"
            />
          </v-col>

          <v-col class="py-0 ma-0" cols="12">
            <!-- URL -->
            <VTextField
              v-model="url"
              :rules="rules.url"
              placeholder="URL..."
              type="text"
              variant="solo"
              bg-color="#23232A"
              style="color: white"
              rounded="lg"
              required
            />
          </v-col>

          <v-col class="py-0 ma-0" cols="12">
            <!-- HEX first letter color -->
            <VTextField
              v-model="hex"
              :rules="rules.hex"
              placeholder="Цвет первой буквы (пример: #000)..."
              type="text"
              variant="solo"
              bg-color="#23232A"
              style="color: white"
              rounded="lg"
              required
            />
          </v-col>

          <v-col class="py-0 ma-0" cols="12">
            <p style="color: white">Цвет (поле ниже):</p>
            <div id="show-hex-color" :style="`background-color: ${hex};`"></div>
          </v-col>

          <v-col class="py-0 ma-0" cols="12">
            <VBtn
              :loading="loading"
              :disabled="!isFormValid"
              text="Сохранить"
              type="submit"
              base-color="#6f00ff"
              block
            />
          </v-col>

          <v-col class="pt-0" cols="12">
            <VBtn @click="cancel" text="Отмена" block />
          </v-col>
        </v-row>
      </v-container>
    </VForm>
  </v-dialog>
</template>

<style lang="scss">
#website-editor-dialog {
  background-color: #00000077;
}

#website-editor {
  background-color: transparent;
  max-width: 700px;
  width: 100%;
}

#website-editor-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--background-second-color-dark-theme);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
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

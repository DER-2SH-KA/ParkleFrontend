<script lang="ts" setup>
import type { WebsiteCreateDto, WebsiteResponseDto, WebsiteUpdateDto } from '@/scripts/declaration'
import { onMounted, ref } from 'vue'
import { createWebsite, updateWebsiteById } from '@/scripts/api'
import { useCurrentUserStore, useWebsitesStore } from '@/scripts/stores/piniaStore'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'

import { websiteRules } from '../scripts/validationRules'

const model = defineModel<boolean>()
const colorPickerDialogModel = ref<boolean>(false)

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

const colorPickerModel = ref<string>()

const isFormValid = ref<boolean | null>(null)

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

function showColorPickerDialog() {
  console.log(colorPickerModel.value)

  if (!!hex.value && hex.value != '') {
    colorPickerModel.value = hex.value
  } else {
    colorPickerModel.value = undefined
  }

  colorPickerDialogModel.value = true
}

function setColorPickerModelValueToHEX() {
  console.log(colorPickerModel.value)

  if (!!colorPickerModel.value) {
    hex.value = colorPickerModel.value
  }

  colorPickerDialogModel.value = false
}

onMounted(() => {
  fillFields()
})
</script>

<template>
  <v-dialog class="dialog-design" v-model="model">
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
              :rules="websiteRules.title"
              label="Название"
              placeholder="Название..."
              append-inner-icon="$text"
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
              :rules="websiteRules.description"
              label="Описание"
              placeholder="Описание..."
              append-inner-icon="$text_long"
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
              :rules="websiteRules.url"
              label="URL"
              placeholder="URL..."
              append-inner-icon="$web"
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
              :rules="websiteRules.hex"
              label="HEX (цвет)"
              placeholder="Цвет первой буквы (пример: #000)..."
              append-inner-icon="$brush"
              type="text"
              variant="solo"
              bg-color="#23232A"
              style="color: white"
              rounded="lg"
              required
              @click:append-inner="showColorPickerDialog()"
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

    <v-dialog class="dialog-design" v-model="colorPickerDialogModel">
      <v-container id="color-picker-container">
        <v-row class="pa-0 ma-0">
          <v-col class="pa-0 ma-0" cols="12">
            <!-- Color Picker -->
            <v-color-picker class="w-100" v-model="colorPickerModel" mode="hex" />
          </v-col>

          <v-col class="pa-0 my-2" cols="12">
            <v-btn
              text="Выбрать"
              base-color="#6f00ff"
              block
              @click="setColorPickerModelValueToHEX()"
            />
          </v-col>

          <v-col class="pa-0 ma-0" cols="12">
            <v-btn text="Закрыть" block @click="colorPickerDialogModel = false" />
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </v-dialog>
</template>

<style lang="scss">
.dialog-design {
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

#color-picker-dialog {
  background-color: #00000077;
}

#color-picker-container {
  padding: 10px;
  background-color: var(--background-second-color-dark-theme);
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
}

@media (max-width: 768px) {
  #website-editor {
    max-width: 90%;
  }

  #color-picker-container {
    padding: 10px;
    background-color: var(--background-second-color-dark-theme);
    border-radius: 10px;
    max-width: 80vw;
    width: 100%;
  }
}
</style>

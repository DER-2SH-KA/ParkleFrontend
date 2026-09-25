<script lang="ts" setup>
import type {
  WebsiteCreateDto,
  WebsiteResponseDto,
  WebsiteUpdateDto,
  WebsiteTagResponseDto,
} from '@/scripts/declaration'
import { ref, watch } from 'vue'
import { createWebsite, updateWebsiteById, getMetaContentByUrl } from '@/scripts/api/websiteApi'
import { useCurrentUserStore, useWebsitesStore } from '@/scripts/stores/piniaStore'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'

import { websiteRules } from '../../scripts/validationRules.ts'
import {
  isErrorResponseDto,
  isWebsiteDataResponseDto,
  isWebsiteResponseDto,
} from '@/scripts/typeGuards'
import WebsiteTagComponent from './WebsiteTagComponent.vue'

const model = defineModel<boolean>()
const colorPickerDialogModel = ref<boolean>(false)

const currentUserStore = useCurrentUserStore()
const loading = ref<boolean>(false)

const title = ref<string>('')
const hex = ref<string>('#')
const tags = ref<Set<WebsiteTagResponseDto>>(new Set())

const colorPickerModel = ref<string>()

const isFormValid = ref<boolean | null>(null)

function cancel() {
  model.value = false
  clearFields()
}

function clearFields() {
  title.value = ''
  hex.value = ''
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
            <p style="color: white; text-align: center; font-size: 16pt"><strong>Теги</strong></p>
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
              text="Создать или сохранить"
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
  background-color: #00000055;
}

#website-editor {
  max-width: 700px;
  width: 100%;
}

#website-editor-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;
  padding: 20px;
  width: 100%;

  background: rgba(10, 10, 10, 0.75) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  color: white;
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

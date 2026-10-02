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
    <VForm v-model="isFormValid" validate-on="input">
      <v-container>
        <v-row>
          <v-col>
            <!-- Dialog title -->
            <p><strong>Теги</strong></p>
          </v-col>

          <v-col>
            <!-- Website title -->
            <VTextField
              v-model="title"
              :rules="websiteRules.title"
              label="Название"
              placeholder="Название..."
              append-inner-icon="$text"
              type="text"
            />
          </v-col>

          <v-col>
            <!-- HEX first letter color -->
            <VTextField
              v-model="hex"
              :rules="websiteRules.hex"
              label="HEX (цвет)"
              placeholder="Цвет первой буквы (пример: #000)..."
              append-inner-icon="$brush"
              type="text"
              @click:append-inner="showColorPickerDialog()"
            />
          </v-col>

          <v-col>
            <p>Цвет (поле ниже):</p>
            <div>* Цвет *</div>
          </v-col>

          <v-col class="py-0 ma-0" cols="12">
            <VBtn
              :loading="loading"
              :disabled="!isFormValid"
              text="Создать или сохранить"
              type="submit"
            />
          </v-col>

          <v-col>
            <VBtn @click="cancel" text="Отмена" block />
          </v-col>
        </v-row>
      </v-container>
    </VForm>

    <v-dialog v-model="colorPickerDialogModel">
      <v-container>
        <v-row>
          <v-col>
            <!-- Color Picker -->
            <v-color-picker v-model="colorPickerModel" mode="hex" />
          </v-col>

          <v-col>
            <v-btn text="Выбрать" @click="setColorPickerModelValueToHEX()" />
          </v-col>

          <v-col>
            <v-btn text="Закрыть" @click="colorPickerDialogModel = false" />
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </v-dialog>
</template>

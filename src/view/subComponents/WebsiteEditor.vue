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
const tags = ref<Set<WebsiteTagResponseDto>>(new Set())

const colorPickerModel = ref<string>()

const isFormValid = ref<boolean | null>(null)

/* eslint-disable @typescript-eslint/no-unused-vars */
async function saveWebsiteFromAddDialog(event: Event) {
  loading.value = true

  if (props.website === undefined) {
    console.info('Starting submiting and send create website!')

    const websiteCreateDto: WebsiteCreateDto = {
      userLogin: currentUserStore.currentUser?.login ?? '',
      title: title.value ? title.value : '',
      description: description.value,
      url: url.value ? url.value : '',
      hexColor: hex.value ? hex.value : '',
      tags: tags.value,
    }

    await createWebsite(websiteCreateDto)
      .then((result) => {
        if (isWebsiteResponseDto(result)) {
          websitesStore.websites.push(result)
          console.info('Website was created', result)
          showAlert('Сайт создан успешно!', TYPE.SUCCESS)

          clearFields()
          model.value = false
        } else {
          showAlert(result.messageForClient, TYPE.ERROR)
        }
      })
      .catch((err) => {
        if (isErrorResponseDto(err)) {
          console.error('Error to create new website from WebsiteEditor: ' + err.messageForDev, err)
          showAlert(err.messageForClient, TYPE.ERROR)
        }
      })
  } else {
    console.info('Starting submiting and send update website!')

    const websiteUpdateDto: WebsiteUpdateDto = {
      id: props.website.id,
      title: title.value,
      description: description.value ?? '',
      url: url.value,
      hexColor: hex.value,
      tags: tags.value,
    }

    console.info('Current user data:', useCurrentUserStore().currentUser?.login)
    console.info('props website data:', props.website)
    console.info('Update website dto data:', websiteUpdateDto)

    await updateWebsiteById(props.website.id, websiteUpdateDto)
      .then((result) => {
        if (isWebsiteResponseDto(result)) {
          const websiteToUpdate: WebsiteResponseDto | undefined = websitesStore.websites.find(
            (w) => w == props.website,
          )

          if (!!websiteToUpdate) {
            websiteToUpdate.title = title.value
            websiteToUpdate.description = description.value ?? ''
            websiteToUpdate.url = url.value
            websiteToUpdate.hexColor = hex.value
          }

          console.info('Website was updated!', result)
          showAlert('Сайт обновлён успешно!', TYPE.SUCCESS)

          fillFields()
          model.value = false
        } else {
          showAlert(result.messageForClient, TYPE.ERROR)
        }
      })
      .catch((err) => {
        if (isErrorResponseDto(err)) {
          console.error('Update website by id error: ' + err.messageForDev, err)
          showAlert(err.messageForClient, TYPE.ERROR)
        }
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
    title.value = props.website.title.toString()
    description.value = props.website.description?.toString() ?? ''
    url.value = props.website.url.toString()
    hex.value = props.website.hexColor.toString()
    tags.value = props.website.tags
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

function getWebsiteTitleAndDescriptionByUrl() {
  if (title.value == '' && description.value == '') {
    getMetaContentByUrl(url.value)
      .then((dto) => {
        if (isWebsiteDataResponseDto(dto)) {
          title.value = dto.title.substring(0, 39)
          description.value = dto.description ? dto.description.substring(0, 254) : ''
        } else {
          showAlert(dto.messageForClient, TYPE.ERROR)
          console.error('Error fetching meta-data by url: ', dto.messageForDev)
        }
      })
      .catch((err) => {
        console.error('Error fetching meta-data by url: ', err)
      })
  }
}

watch(model, (newX) => {
  fillFields()
})
</script>

<template>
  <v-dialog v-model="model">
    <v-form v-model="isFormValid" validate-on="input" @submit.prevent="saveWebsiteFromAddDialog">
      <v-container>
        <v-row>
          <v-col>
            <!-- Dialog title -->
            <p><strong>Сайт</strong></p>
          </v-col>

          <v-col>
            <!-- Website title -->
            <VTextField
              v-model="title"
              :rules="websiteRules.title"
              label="Название"
              placeholder="Название..."
              append-inner-icon="$text"
            />
          </v-col>

          <v-col>
            <!-- Description -->
            <VTextField
              v-model="description"
              :rules="websiteRules.description"
              label="Описание"
              placeholder="Описание..."
              append-inner-icon="$text_long"
            />
          </v-col>

          <v-col>
            <!-- URL -->
            <v-container>
              <v-row>
                <v-col>
                  <VTextField
                    v-model="url"
                    :rules="websiteRules.url"
                    label="URL"
                    placeholder="URL..."
                    append-inner-icon="$web"
                  />
                </v-col>
                <v-col>
                  <v-btn>
                    <v-icon icon="$magnify" @click="getWebsiteTitleAndDescriptionByUrl()" />
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col>
            <!-- HEX first letter color -->
            <VTextField
              v-model="hex"
              :rules="websiteRules.hex"
              label="HEX (цвет)"
              placeholder="Цвет первой буквы (пример: #000)..."
              append-inner-icon="$brush"
              @click:append-inner="showColorPickerDialog()"
            />
          </v-col>

          <v-col>
            <p>Цвет (поле ниже):</p>
            <div>* Цвет *</div>
          </v-col>

          <v-col>
            <v-row>
              <v-col>
                <p>Теги:</p>
              </v-col>

              <v-col>
                <WebsiteTagComponent v-for="item in tags" :key="item.id" :website-tag="item" />

                <v-btn>+</v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col>
            <VBtn :loading="loading" :disabled="!isFormValid" text="Сохранить" />
          </v-col>

          <v-col>
            <VBtn @click="cancel" text="Отмена" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

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

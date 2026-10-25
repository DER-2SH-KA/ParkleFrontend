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
import WebsiteTagItem from '@/view/subComponents/WebsiteTagItem.vue'
import ColorPickerComponent from './ColorPickerComponent.vue'
import SearchWebsiteTagComponent from './SearchWebsiteTagComponent.vue'
import { sortWebsiteTagsByName } from '@/scripts/utils.ts'

const model = defineModel<boolean>()
const colorPickerDialogModel = ref<boolean>(false)
const colorPickerModel = ref<string>()

const findWebsiteTagDialogModel = ref<boolean>()

const props = defineProps<{
  website: WebsiteResponseDto | undefined
}>()

const currentUserStore = useCurrentUserStore()
const websitesStore = useWebsitesStore()

const loading = ref<boolean>(false)

const title = ref<string>('')
const description = ref<string>('')
const url = ref<string>('')
const hex = ref<string>('#fff')
const tags = ref<WebsiteTagResponseDto[]>([])

const titleCounter = 40
const descriptionCounter = 255

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
  tags.value = []
}

function fillFields() {
  if (props.website !== undefined) {
    title.value = props.website.title.toString()
    description.value = props.website.description?.toString() ?? ''
    url.value = props.website.url.toString()
    hex.value = props.website.hexColor.toString()
    tags.value = sortWebsiteTagsByName(props.website.tags)
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
  <v-dialog v-model="model" max-width="480">
    <v-card color="surface" rounded="lg" class="pa-6 border">
      <v-form
        v-model="isFormValid"
        validate-on="input"
        class="d-flex flex-column ga-4"
        @submit.prevent="saveWebsiteFromAddDialog"
      >
        <!-- Заголовок -->
        <h2 class="my-0 py-0 text-h6 font-weight-bold text-center text-high-emphasis mb-2">Сайт</h2>

        <!-- Название -->
        <v-text-field
          v-model="title"
          label="Название"
          :rules="websiteRules.title"
          :counter="titleCounter"
          placeholder="Его вы будете видеть часто"
          append-inner-icon="$text"
          variant="solo"
          rounded="lg"
          hide-details="auto"
        />

        <!-- Описание -->
        <v-textarea
          v-model="description"
          label="Описание"
          :rules="websiteRules.description"
          :counter="descriptionCounter"
          placeholder="Опишите сайт поподробнее, чтобы было проще его узнать или найти"
          rows="2"
          append-inner-icon="$textLong"
          variant="solo"
          rounded="lg"
          hide-details="auto"
          no-resize
        />

        <!-- URL -->
        <v-text-field
          v-model="url"
          label="Ссылка"
          :rules="websiteRules.url"
          placeholder="Ссылка на сайт"
          append-inner-icon="$web"
          variant="solo"
          rounded="lg"
          hide-details="auto"
        />

        <!-- Превью и выбор цвета (открывает палитру по клику) -->
        <div class="d-flex flex-column ga-2">
          <span class="text-body-2 text-medium-emphasis font-weight-medium">
            Цвет первой буквы (поле ниже):
          </span>
          <div
            class="color-preview-box rounded-lg border d-flex align-center justify-center"
            :style="hex ? { backgroundColor: hex } : undefined"
            role="button"
            tabindex="0"
            @click="showColorPickerDialog"
            @keydown.enter="showColorPickerDialog"
          >
            <span v-if="!hex" class="text-caption text-medium-emphasis">
              Нажмите для выбора цвета
            </span>
          </div>
        </div>

        <!-- Теги -->
        <div class="d-flex flex-column justify-center align-start ga-2">
          <span class="text-body-2 text-medium-emphasis font-weight-medium">Теги:</span>
          <div class="d-flex flex-wrap align-center ga-2">
            <WebsiteTagItem v-for="item in tags" :key="item.id" :website-tag="item" />
            <v-btn
              variant="tonal"
              color="surface-variant"
              rounded="lg"
              @click="findWebsiteTagDialogModel = !findWebsiteTagDialogModel"
            >
              +
            </v-btn>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="d-flex flex-column ga-3 pt-2">
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            rounded="lg"
            :loading="loading"
            :disabled="!isFormValid"
            >Сохранить</v-btn
          >

          <v-btn variant="tonal" rounded="lg" @click="cancel">Отмена</v-btn>
        </div>
      </v-form>
    </v-card>

    <ColorPickerComponent
      v-model:dialog-model="colorPickerDialogModel"
      v-model:hex-website-model="hex"
      v-model:color-picker-model="colorPickerModel"
    />
  </v-dialog>

  <v-dialog v-model="findWebsiteTagDialogModel">
    <v-card color="surface" rounded="lg" class="pa-0 border">
      <SearchWebsiteTagComponent
        v-model="tags"
        @add-tag-to-website="(tag: WebsiteTagResponseDto) => tags.push(tag)"
      />
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Область предпросмотра цвета */
.color-preview-box {
  width: 100%;
  height: 42px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
</style>

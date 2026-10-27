<script lang="ts" setup>
import type { WebsiteTagResponseDto } from '@/scripts/declaration'
import { websiteTagRules } from '@/scripts/validationRules'
import { ref, watch } from 'vue'
import ColorPickerComponent from '@/view/subComponents/ColorPickerComponent.vue'
import {
  createWebsiteTag,
  updateWebsiteTagById,
  deleteWebsiteTag,
} from '@/scripts/api/websiteTagApi'
import { useCurrentUserStore } from '@/scripts/stores/piniaStore'

const userStore = useCurrentUserStore()

const isFormValid = ref<boolean>(false)
const colorPickerDialogModel = ref<boolean>(false)
const colorPickerModel = ref<string>()

const title = ref<string>('')
const hex = ref<string>('#fff')

const titleCounter = 50

const props = defineProps<{
  websiteTag: WebsiteTagResponseDto | undefined
}>()

function showColorPickerDialog() {
  console.log(colorPickerModel.value)

  if (!!hex.value && hex.value != '') {
    colorPickerModel.value = hex.value
  } else {
    colorPickerModel.value = undefined
  }

  colorPickerDialogModel.value = true
}

function fillFields() {
  if (!!props.websiteTag) {
    title.value = props.websiteTag.title
    hex.value = props.websiteTag.hex
  } else {
    title.value = ''
    hex.value = '#fff'
  }
}

async function onClickSaveButton() {
  console.info('click on save button')

  console.info(userStore.currentUser)

  if (!!props.websiteTag && props.websiteTag.id) {
    console.log('start updating website tag...')

    const updateResponse = await updateWebsiteTagById(props.websiteTag.id, {
      id: props.websiteTag.id,
      title: title.value,
      hex: hex.value,
    })

    console.info('Website tag update response:', updateResponse)
  } else if (!!userStore.currentUser) {
    console.log('start creating website tag...')

    const createResponse = await createWebsiteTag({
      userId: userStore.currentUser.id,
      title: title.value,
      hex: hex.value,
    })

    console.info('Website tag create response:', createResponse)
  }
}

async function onClickDeleteButton() {
  console.info('click on delete button')

  if (!!props.websiteTag && props.websiteTag.id) {
    console.log('start deleting website tag...')

    const deleteResponse = await deleteWebsiteTag(props.websiteTag.id)

    console.info('Website tag delete response:', deleteResponse)
  }
}

watch(
  () => props.websiteTag,
  () => {
    fillFields()
  },
)
</script>

<template>
  <v-form
    v-model="isFormValid"
    validate-on="input"
    class="d-flex flex-column ga-4"
    @submit.prevent="onClickSaveButton"
  >
    <!-- Заголовок -->
    <h2 class="my-0 py-0 text-h6 font-weight-bold text-center text-high-emphasis mb-2">Тег</h2>

    <!-- Название -->
    <v-text-field
      v-model="title"
      label="Название"
      :rules="websiteTagRules.title"
      :counter="titleCounter"
      placeholder="Название тега"
      append-inner-icon="$text"
      variant="solo"
      rounded="lg"
      hide-details="auto"
    />

    <!-- Превью и выбор цвета (открывает палитру по клику) -->
    <div class="d-flex flex-column ga-2">
      <span class="text-body-2 text-medium-emphasis font-weight-medium"> Цвет (поле ниже): </span>
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

    <!-- Кнопки действий -->
    <div class="d-flex flex-row justify-center ga-3 pt-2">
      <v-btn type="submit" color="primary" variant="flat" rounded="lg" :disabled="!isFormValid"
        >Сохранить</v-btn
      >

      <v-btn variant="tonal" rounded="lg" @click="onClickDeleteButton">Удалить</v-btn>
    </div>
  </v-form>

  <ColorPickerComponent
    v-model:dialog-model="colorPickerDialogModel"
    v-model:hex-website-model="hex"
    v-model:color-picker-model="colorPickerModel"
  />
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

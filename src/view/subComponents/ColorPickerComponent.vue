<script lang="ts" setup>
const dialogModel = defineModel<boolean>('dialog-model', { required: true })
const hexWebsiteModel = defineModel<string>('hex-website-model', { required: true })
const colorPickerModel = defineModel<string | undefined>('color-picker-model', { required: true })

function setColorPickerModelValueToHEX() {
  console.log(colorPickerModel.value)

  if (!!colorPickerModel.value) {
    hexWebsiteModel.value = colorPickerModel.value
  }
  dialogModel.value = false
}
</script>

<template>
  <v-dialog v-model="dialogModel" max-width="320" class="blurred-dialog">
    <v-card color="surface" rounded="xl" class="pa-4 border">
      <v-color-picker v-model="colorPickerModel" mode="hex" hide-inputs class="mx-auto" />
      <div class="d-flex ga-2 mt-4">
        <v-btn
          color="primary"
          rounded="lg"
          flat
          class="flex-grow-1 font-weight-bold"
          @click="setColorPickerModelValueToHEX"
        >
          Выбрать
        </v-btn>
        <v-btn
          variant="tonal"
          rounded="lg"
          class="flex-grow-1 font-weight-bold"
          @click="dialogModel = false"
        >
          Закрыть
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

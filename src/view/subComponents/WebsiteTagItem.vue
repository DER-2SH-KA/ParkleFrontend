<script lang="ts" setup>
import { onMounted } from 'vue'
import type { WebsiteTagResponseDto } from '@/scripts/declaration'

const props = defineProps<{
  websiteTag: WebsiteTagResponseDto
  showCloseButton: boolean
}>()
const emits = defineEmits(['remove-tag'])

function onClickCloseButton() {
  emits('remove-tag', props.websiteTag)
}

onMounted(() => {
  console.info(props.websiteTag)
})
</script>

<template>
  <v-sheet
    class="px-3 py-2 d-flex align-center justify-center"
    color="transparent"
    rounded="lg"
    :style="`border: 2px solid ${websiteTag.hex}`"
  >
    <span class="font-weight-bold" :style="`color: ${websiteTag.hex}; font-size: 10pt`">{{
      props.websiteTag.title
    }}</span>
    <v-btn
      v-if="props.showCloseButton"
      @click="onClickCloseButton"
      density="compact"
      variant="text"
      icon="$close"
      color="error"
    />
  </v-sheet>
</template>

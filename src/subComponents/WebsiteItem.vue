<script lang="ts" setup>
import type { Website } from '@/scripts/declaration'

const props = defineProps<{
  website: Website
  isEditingModeActive: boolean
}>()

const emits = defineEmits<{
  onDelete: [id: number]
}>()

const fLetterColor = props.website.hex

const onDeleteWebsite = () => {
  emits('onDelete', props.website.id)
}
</script>

<template>
  <div class="website-item">
    <a class="link-name" :href="props.website.url" target="_blank">{{ props.website.title }}</a>
    <VBtn
      class="link-delete"
      @click="onDeleteWebsite"
      variant="plain"
      size="small"
      rounded="lg"
      :style="`display: ${props.isEditingModeActive ? 'block' : 'none'}; color: red;`"
      >&otimes;</VBtn
    >
  </div>
</template>

<style lang="scss">
.website-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-item-color-dark-theme);
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
}

.link-name {
  color: var(--text-color-dark-theme);
  text-align: center;
  text-decoration: none;
  font-size: 14pt;

  &::first-letter {
    color: v-bind(fLetterColor);
  }
}

.link-delete {
  color: red;
  text-align: end;
  text-decoration: none;
  font-size: 14pt;
  padding: 0px 3px;
  margin-left: 10px;
}
</style>

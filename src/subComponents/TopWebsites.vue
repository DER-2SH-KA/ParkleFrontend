<script lang="ts" setup>
import type { WebsiteResponseDto } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed, ref } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'

const modelSearchBarText = defineModel<string>()
const props = defineProps<{
  isEditingModeActive: boolean
}>()

const websites = ref<WebsiteResponseDto[]>([])

const sortedWebsites = computed<WebsiteResponseDto[]>(() => {
  const sortedList = sortWebsiteByName(websites.value)
  return sortedList
})

const websitesToShow = computed<WebsiteResponseDto[]>(() => {
  const filteredList = sortedWebsites.value.filter((x) => {
    if (modelSearchBarText.value == undefined || modelSearchBarText.value! == '') {
      return true
    } else {
      return (
        x.title.toLowerCase().includes(modelSearchBarText.value!.toLowerCase()) ||
        x.url.toLowerCase().includes(modelSearchBarText.value!.toLowerCase())
      )
    }
  })
  return filteredList
})

const removeWebsiteById = (id: string) => {
  websites.value = websites.value.filter((x) => x.id != id)
}
</script>

<template>
  <div id="top-websites">
    <div v-for="website in websitesToShow" :key="website.id">
      <WebsiteItem
        :website="website"
        :is-editing-mode-active="props.isEditingModeActive"
        @on-delete="(id) => removeWebsiteById(id)"
      />
    </div>
  </div>
</template>

<style lang="scss">
#top-websites {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-items: start;
  /*background-color: red;*/
}
</style>

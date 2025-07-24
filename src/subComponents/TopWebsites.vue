<script lang="ts" setup>
import type { WebsiteResponseDto } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed, onMounted, ref } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'
import { getAllWebsites } from '@/scripts/api'

const modelSearchBarText = defineModel<string>()
const props = defineProps<{
  isEditingModeActive: boolean
}>()

const websites = ref<WebsiteResponseDto[] | undefined>([])

const sortedWebsites = computed<WebsiteResponseDto[]>(() => {
  if (!Array.isArray(websites.value)) {
    return []
  }
  return sortWebsiteByName(websites.value)
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
  websites.value = websites.value?.filter((x) => x.id != id)
}

onMounted(async () => {
  await getAllWebsites()
    .then((response) => {
      console.info('getAllWebsites() response', response)

      if (response != null) websites.value = response
    })
    .catch((error) => {
      console.info('Error:', error)
    })
})
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

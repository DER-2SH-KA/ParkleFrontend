<script lang="ts" setup>
import type { WebsiteResponseDto } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'
import { deleteWebsite } from '@/scripts/api'
import { useWebsitesStore } from '@/scripts/stores/piniaStore'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'

const modelSearchBarText = defineModel<string>()
const props = defineProps<{
  isEditingModeActive: boolean
}>()

const websitesStore = useWebsitesStore()

const sortedWebsites = computed<WebsiteResponseDto[]>(() => {
  if (!Array.isArray(websitesStore.websites)) {
    return []
  }
  return sortWebsiteByName(websitesStore.websites)
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

const removeWebsiteById = async (id: string) => {
  await deleteWebsite(id)
    .then(() => {
      websitesStore.websites = websitesStore.websites?.filter((x) => x.id != id)
      showAlert(`Website was deleted`, TYPE.SUCCESS)
    })
    .catch((error) => {
      console.error('removeWebsiteById', error)
      showAlert(`Website wasn't delete`, TYPE.ERROR)
    })
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

<script lang="ts" setup>
import type { UserResponseDto, WebsiteResponseDto } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed, onMounted } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'
import { deleteWebsite, getWebsitesByUserLogin, isAuthedRequest } from '@/scripts/api'
import { useCurrentUserStore, useWebsitesStore } from '@/scripts/stores/piniaStore'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'

const modelSearchBarText = defineModel<string>()
const props = defineProps<{
  isEditingModeActive: boolean
}>()

const currentUserStore = useCurrentUserStore()
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

onMounted(async () => {
  let isAuthedUser: UserResponseDto | undefined = undefined

  await isAuthedRequest()
    .then(async (result) => {
      isAuthedUser = result
      console.info('onMounted TopWebsites then =>', result)

      currentUserStore.currentUser = isAuthedUser

      websitesStore.websites = !!currentUserStore.currentUser
        ? await getWebsitesByUserLogin(currentUserStore.currentUser.login)
        : []
    })
    .catch((err) => {
      console.error('onMounted TopWebsites error =>', err)
    })
})
</script>

<template>
  <div class="website-item-from-block">
    <WebsiteItem
      v-for="website in websitesToShow"
      :key="website.id"
      :website="website"
      :is-editing-mode-active="props.isEditingModeActive"
      @on-delete="(id) => removeWebsiteById(id)"
    />
  </div>
</template>

<style lang="scss">
.website-item-from-block {
  display: flex;
  flex-flow: row wrap;
  position: absolute;
  top: 100%;
  width: 100%;
}
</style>

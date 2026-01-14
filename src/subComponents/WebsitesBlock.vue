<script lang="ts" setup>
import type { ErrorResponseDto, UserResponseDto, WebsiteResponseDto } from '@/scripts/declaration'
import WebsiteItem from './WebsiteItem.vue'
import { computed, onMounted } from 'vue'
import { sortWebsiteByName } from '../scripts/utils'
import { deleteWebsite, getWebsitesByUserLogin } from '@/scripts/api/api'
import { isAuthed } from '@/scripts/api/userApi'
import { useCurrentUserStore, useWebsitesStore } from '@/scripts/stores/piniaStore'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'
import { isUserResponseDto } from '@/scripts/checkObjectsByStructure'

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
      showAlert(`Сайт удалён успешно!`, TYPE.SUCCESS)
    })
    .catch((error) => {
      console.error('removeWebsiteById', error)
      showAlert(`Ошибка удаления сайта!`, TYPE.ERROR)
    })
}

onMounted(async () => {
  let responseDto: UserResponseDto | ErrorResponseDto = {
    messageForClient: 'а',
    messageForDev: 'a',
  }

  await isAuthed()
    .then(async (result) => {
      responseDto = result
      console.info('onMounted TopWebsites then =>', result)

      if (isUserResponseDto(responseDto)) {
        currentUserStore.currentUser = responseDto ?? undefined

        websitesStore.websites = !!currentUserStore.currentUser
          ? await getWebsitesByUserLogin(currentUserStore.currentUser.login)
          : []
      } /*else {
        if (responseDto.messageForClient != "")

        showAlert(responseDto.messageForClient, TYPE.ERROR)
      }*/
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

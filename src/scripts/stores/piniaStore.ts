import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type WebsiteResponseDto, type UserResponseDto } from '../declaration'

export const useCurrentUserStore = defineStore('currentUser', () => {
  const currentUser = ref<UserResponseDto | undefined>(undefined)

  function $reset() {
    currentUser.value = undefined
  }

  return { currentUser, $reset }
})

export const useWebsitesStore = defineStore('websites', () => {
  const websites = ref<WebsiteResponseDto[]>([])
  const topWebsites = ref<WebsiteResponseDto[]>([])

  function $reset() {
    websites.value = []
    topWebsites.value = []
  }

  return { websites, topWebsites, $reset }
})

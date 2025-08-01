import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type UserResponseDto } from '../declaration'

export const useCurrentUserStore = defineStore('currentUser', () => {
  const currentUser = ref<UserResponseDto | undefined>(undefined)

  function $reset() {
    currentUser.value = undefined
  }

  return { currentUser, $reset }
})

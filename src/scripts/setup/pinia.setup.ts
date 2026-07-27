import { createPinia } from 'pinia'
import { useCurrentUserStore, useWebsitesStore } from '../stores/piniaStore'
import { getWebsitesByUserLogin } from '../api/websiteApi'
import { isErrorResponseDto } from '../typeGuards'

export const pinia = createPinia()

export function piniaSetupCurrentUserStoreTrigger(): void {
  const currentUserStore = useCurrentUserStore()
  const websitesStore = useWebsitesStore()

  // Trigger on current user was changed.
  currentUserStore.$onAction(async ({ name, args }) => {
    if (name === 'setCurrentUser') {
      const user = args[0] // Argument of new user.

      if (!!user) {
        await getWebsitesByUserLogin(user.login)
          .then((result) => {
            if (!isErrorResponseDto(result)) {
              websitesStore.websites = result
            } else {
              websitesStore.websites = []
            }
          })
          .catch((error) => {
            console.error(`Error get websites by userLogin: ${user.login}`, error)
          })
      } else {
        websitesStore.websites = []
      }
    }
  })
}

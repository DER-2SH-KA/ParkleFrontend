// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'

import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import 'vuetify/styles'
import * as components from 'vuetify/components'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import { mdiMagnify, mdiCog, mdiDelete, mdiPencil, mdiEye } from '@mdi/js'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { ru } from 'vuetify/locale'
import HomePage from './HomePage.vue'
import LoginPage from './LoginPage.vue'
import RegistrationPage from './RegistrationPage.vue'
import { useCurrentUserStore, useWebsitesStore } from './scripts/stores/piniaStore'
import { getWebsitesByUserLogin } from './scripts/api'
import AboutSite from './AboutSite.vue'

const app = createApp(App)

const pinia = createPinia()

// Router settings.
const routes = [
  { path: '/', component: HomePage },
  { path: '/auth/registration', component: RegistrationPage },
  { path: '/auth/login', component: LoginPage },
  { path: '/about', component: AboutSite },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// Toast settings.
const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 4000,
}

// Vuetify settings.
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      magnify: mdiMagnify,
      cog: mdiCog,
      pencil: mdiPencil,
      delete: mdiDelete,
      eye: mdiEye,
    },
    sets: {
      mdi,
    },
  },
  components,
  directives,
  locale: {
    locale: 'ru',
    fallback: 'en',
    messages: {
      ru,
    },
  },
})

app.use(router)
app.use(Toast, toastOptions)
app.use(vuetify)
app.use(pinia)

// For watching on user and update list of websites.
const currentUserStore = useCurrentUserStore()
const websitesStore = useWebsitesStore()

currentUserStore.$onAction(async ({ name, args }) => {
  if (name === 'setCurrentUser') {
    const user = args[0] // Argument of new user.

    if (!!user) {
      console.log('Triggered `setCurrentUser` function...')

      await getWebsitesByUserLogin(user.login)
        .then((result) => {
          websitesStore.websites = result
        })
        .catch((error) => {
          console.error(`Error get websites by userId: ${user.id}`, error)
        })
    } else websitesStore.websites = []
  }
})

app.mount('#app')

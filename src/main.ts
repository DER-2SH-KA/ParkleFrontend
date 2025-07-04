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
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { ru } from 'vuetify/locale'
import MainPage from './MainPage.vue'
import LoginPage from './LoginPage.vue'
import RegistrationPage from './RegistrationPage.vue'

const app = createApp(App)

const routes = [
  { path: '/', component: MainPage },
  { path: '/auth/registration', component: RegistrationPage },
  { path: '/auth/login', component: LoginPage },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 4000,
}
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
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

app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)
app.use(vuetify)

app.mount('#app')

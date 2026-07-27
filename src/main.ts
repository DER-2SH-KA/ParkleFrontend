import { createApp } from 'vue'
import App from './App.vue'
import { configuredVuetify } from './scripts/setup/vuetify.setup.ts'
import { routerConfigured } from './scripts/setup/vue-router.setup.ts'
import { toast, toastOptions } from './scripts/setup/toast.setup.ts'
import { pinia, piniaSetupCurrentUserStoreTrigger } from './scripts/setup/pinia.setup.ts'
import { axiosSetup } from './scripts/setup/axios.setup.ts'

const app = createApp(App)

app.use(routerConfigured)
app.use(toast, toastOptions)
app.use(configuredVuetify)
app.use(pinia)

axiosSetup()
piniaSetupCurrentUserStoreTrigger()

app.mount('#app')

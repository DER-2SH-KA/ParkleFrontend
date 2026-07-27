import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export const toast = Toast

export const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 4000,
}

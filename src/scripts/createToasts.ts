import { useToast, type TYPE } from 'vue-toastification'

const toast = useToast()

export function showAlert(message: string, type: TYPE) {
  toast(message, { type: type })
  return { toast }
}

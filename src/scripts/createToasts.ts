import { useToast, type TYPE } from 'vue-toastification'

const toast = useToast()

export function showToast(message: string, type: TYPE) {
  toast(message, { type: type })
  return { toast }
}

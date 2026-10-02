<script setup lang="ts">
import { useCurrentUserStore } from '@/scripts/stores/piniaStore'
import { deleteAccount } from '@/scripts/api/userApi'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'

const currentUserStore = useCurrentUserStore()
const isShowDeleteAccountDialog = defineModel<boolean>()

const onDeleteUserDialogAccept = async () => {
  await deleteAccount(currentUserStore.currentUser?.login)
    .then((dto) => {
      console.info('deleteUser', dto)

      showAlert('Пользователь удалён успешно!', TYPE.SUCCESS)
      currentUserStore.setCurrentUser(undefined)

      isShowDeleteAccountDialog.value = false
    })
    .catch((error) => {
      console.error('deleteUser', error)
      showAlert('Ошибка удаления пользователя!', TYPE.ERROR)
    })
}

const onDeleteUserDialogDenied = () => {
  isShowDeleteAccountDialog.value = false
}
</script>

<template>
  <v-dialog v-model="isShowDeleteAccountDialog">
    <v-card>
      <v-card-title>Удаление пользователя</v-card-title>
      <v-card-subtitle><span>Действие необратимо</span></v-card-subtitle>

      <v-card-text>
        <p>
          Вы точно хотите безвозвратно
          <span>УДАЛИТЬ</span>
          аккаунт {{ currentUserStore.currentUser?.login }}?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onDeleteUserDialogAccept">Да</v-btn>
        <v-btn @click="onDeleteUserDialogDenied">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="css"></style>

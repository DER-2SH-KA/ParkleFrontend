<script setup lang="ts">
import { ref } from 'vue'
import routesApi from '@/scripts/api/routes'
import { useCurrentUserStore } from '@/scripts/stores/piniaStore'
import { logout } from '@/scripts/api/userApi'
import { showAlert } from '@/scripts/createToasts'
import { TYPE } from 'vue-toastification'
import DeleteUserDialogComponent from '@/view/header/sidebar-menu/dialog/DeleteUserDialogComponent.vue'

const currentUserStore = useCurrentUserStore()
const isShowDeleteAccountDialog = ref<boolean>(false)

const onDeleteUser = () => {
  isShowDeleteAccountDialog.value = true
}

const onLogout = async () => {
  await logout()
    .then(() => {
      currentUserStore.setCurrentUser(undefined)

      showAlert('Вы вышли из системы!', TYPE.SUCCESS)
    })
    .catch(() => {
      showAlert('Ошибка выхода из системы!', TYPE.ERROR)
    })
}
</script>

<template>
  <v-list class="d-flex flex-column justify-center align-space-between">
    <!-- Top side bar menu part -->
    <v-list-item>
      <v-list>
        <v-list-item-action>
          <router-link :to="routesApi.about">Справка</router-link>
        </v-list-item-action>

        <v-divider />
      </v-list>
    </v-list-item>

    <!-- Bottom side bar menu part -->
    <v-list-item>
      <v-list>
        <v-list-item-action>
          <router-link :to="routesApi.settings.base">Настройки</router-link>
        </v-list-item-action>

        <v-list-item-action>
          <a @click="onDeleteUser">Удалить аккаунт</a>
        </v-list-item-action>

        <v-list-item-action>
          <a @click="onLogout">Выйти</a>
        </v-list-item-action>
      </v-list>
    </v-list-item>
  </v-list>

  <DeleteUserDialogComponent v-model="isShowDeleteAccountDialog" />
</template>

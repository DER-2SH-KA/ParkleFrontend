<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrentUserStore } from '../../scripts/stores/piniaStore'
import { deleteAccount, logout } from '../../scripts/api/userApi'
import { showAlert } from '../../scripts/createToasts'
import { TYPE } from 'vue-toastification'
import routesApi from '@/scripts/api/routes'
import UnauthorizedUserSideBarListComponent from './sidebar-menu/UnauthorizedUserSideBarListComponent.vue'
import AuthorizedUserSideBarListComponent from './sidebar-menu/AuthorizedUserSideBarListComponent.vue'
import { useTheme } from 'vuetify'

const navigationDrawer = ref<boolean>(false)
const theme = useTheme()

// ---

const currentUserStore = useCurrentUserStore()

const loadingDeleteAccount = ref<boolean>()
const isShowDeleteAccountDialog = ref<boolean>()

const isLogined = computed<boolean>(() => {
  return !!currentUserStore.currentUser
})

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

const deleteUser = () => {
  loadingDeleteAccount.value = true
  isShowDeleteAccountDialog.value = true
}

const onDeleteUserAccept = async () => {
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
    .finally(() => {
      loadingDeleteAccount.value = false
    })
}

const onDeleteUserDenied = () => {
  loadingDeleteAccount.value = false
  isShowDeleteAccountDialog.value = false
}
</script>

<template>
  <v-app-bar
    density="compact"
    scroll-behavior="elevate"
    scroll-threshold="0"
    height="80"
    color="surface"
  >
    <v-app-bar-title>
      <router-link :to="routesApi.home" class="d-flex align-center flex-row text-decoration-none">
        <img src="../../resources/img/svg/icon.svg" alt="Icon" width="45" height="45" />
        <p id="header__title_text" class="text-"><span class="text-primary">П</span>аркл</p>
      </router-link>
    </v-app-bar-title>

    <template v-slot:append>
      <div>
        <v-icon-btn icon="$themeLightDark" @click="theme.cycle(['light', 'dark'])" />

        <v-app-bar-nav-icon @click.stop="navigationDrawer = !navigationDrawer" />
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="navigationDrawer" location="end" temporary>
    <UnauthorizedUserSideBarListComponent v-if="!isLogined" />

    <AuthorizedUserSideBarListComponent v-else />
  </v-navigation-drawer>

  <!--

<v-menu activator="parent">
                <v-card>
                  <v-card-title>
                    <p>Меню</p>
                  </v-card-title>
                  <v-card-text>
                    <p>Пользователь</p>
                    <p>&lbrack; {{ currentUserStore.currentUser?.login }} &rbrack;</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-container>
                      <v-row>
                        <v-col>
                          <router-link :to="routesApi.settings.base">
                            <v-btn :loading="loadingDeleteAccount">Настройки</v-btn>
                          </router-link>
                        </v-col>

                        <v-col>
                          <v-btn @click="deleteUser" :loading="loadingDeleteAccount"
                            >Удалить аккаунт</v-btn
                          >
                        </v-col>
                        <v-col>
                          <v-btn @click="onLogout">Выйти</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-actions>
                </v-card>
              </v-menu>

  -->

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
        <v-btn @click="onDeleteUserAccept">Да</v-btn>
        <v-btn @click="onDeleteUserDenied">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<!-- TODO: ВЫНЕСТИ ДИАЛОГОВЫЕ ОКНА В ОТДЕЛЬНЫЕ КОМПОНЕНТЫ -->

<style lang="css">
#header__title_text {
  text-decoration: none;
  font-size: 28pt;
  font-weight: 500;
  margin: 10px;
}
</style>

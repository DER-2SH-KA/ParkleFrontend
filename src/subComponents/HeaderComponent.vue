<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrentUserStore } from '../scripts/stores/piniaStore'
import { deleteAccount, logout } from '../scripts/api/userApi'
import { showAlert } from '../scripts/createToasts'
import { TYPE } from 'vue-toastification'

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

function settings() {
  alert('Настройки на стадии разработки')
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
  <header>
    <div id="div-left-side-of-header">
      <router-link id="rl-logo" to="/">
        <img id="rl-logo-img" class="no-select" src=".././resources/img/png/icon.png" alt="Icon" />
        <p id="rl-logo-title" class="no-select">Parkle</p>
      </router-link>
      <router-link id="rl-about-website" class="no-select" to="/about">Справка</router-link>
    </div>

    <div id="div-right-side-of-header">
      <!-- Unauthorized -->
      <div v-if="!isLogined" class="authButtons">
        <button class="authButton no-select">
          <router-link to="/auth/login">Войти</router-link>
        </button>
        <button class="authButton no-select">
          <router-link to="/auth/registration">Регистрация</router-link>
        </button>
      </div>

      <!-- Authorized -->
      <div v-else class="authButtons">
        <button class="authButton no-select">
          <p>Профиль</p>

          <v-menu activator="parent">
            <v-card
              class="mx-auto profile-menu-container"
              color="white"
              variant="outlined"
              min-width="200px"
              max-width="300px"
            >
              <v-card-title>
                <p style="text-align: center; font-weight: bold; font-size: 18pt">Меню</p>
              </v-card-title>
              <v-card-text>
                <p style="text-align: center; font-size: 14pt">Пользователь</p>
                <p
                  style="
                    color: white;
                    border-radius: 3px;
                    text-align: center;
                    font-size: 14pt;
                    padding: 3px 0px 3px 0px;
                  "
                >
                  &lbrack; {{ currentUserStore.currentUser?.login }} &rbrack;
                </p>
              </v-card-text>
              <v-card-actions>
                <v-container fluid class="pa-0">
                  <v-row no-gutters>
                    <v-col class="pa-1 ma-0" cols="12">
                      <v-btn @click="settings" :loading="loadingDeleteAccount" variant="flat" block
                        >Настройки</v-btn
                      >
                    </v-col>
                    <v-col class="pa-1 ma-0" cols="12">
                      <v-btn
                        @click="deleteUser"
                        :loading="loadingDeleteAccount"
                        variant="flat"
                        block
                        >Удалить аккаунт</v-btn
                      >
                    </v-col>
                    <v-col class="pa-1" cols="12">
                      <v-btn @click="onLogout" variant="flat" block>Выйти</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-menu>
        </button>
      </div>
    </div>
  </header>

  <v-dialog id="user-delete-dialog" v-model="isShowDeleteAccountDialog" not-padding persistent>
    <v-card class="user-delete-card pa-1">
      <v-card-title>Удаление пользователя</v-card-title>
      <v-card-subtitle>Действие необратимо</v-card-subtitle>

      <v-card-text>
        <p style="color: red; font-size: 12pt">
          Вы точно хотите безвозвратно удалить аккаунт {{ currentUserStore.currentUser?.login }}?
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="onDeleteUserAccept" variant="outlined">Да</v-btn>
        <v-btn @click="onDeleteUserDenied" variant="flat">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-second-color-dark-theme);
}

#div-left-side-of-header {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

#rl-logo {
  display: flex;
  justify-content: start;
  flex-flow: row nowrap;
  align-items: center;

  text-decoration: none;

  width: auto;
  margin-left: 20px;
}

#rl-logo-img {
  width: 30pt;
  aspect-ratio: 1;
}

#rl-logo-title {
  color: var(--text-color-dark-theme);
  text-decoration: none;
  font-size: 28pt;
  margin-left: 10px;
}

#rl-about-website {
  margin-left: 20px;

  color: white;
  background-color: transparent;

  text-decoration: underline;
  text-align: center;
  font-size: 24pt;
}

#authButtonsContainer {
  display: flex;
  flex-flow: row wrap;
}

.authButtons {
  display: flex;
  flex-flow: row wrap;
  justify-content: end;
  align-items: center;
  margin-right: 5px;
}

.authButton {
  display: inline-block;
  background-color: transparent;
  border: 2px var(--text-color-dark-theme) solid;
  border-radius: 5px;

  font-size: 14pt;

  padding: 5px 10px 5px 10px;
  margin: 10px 10px 10px 0px;

  transform: translateZ(0);

  & > a {
    color: var(--text-color-dark-theme);
    text-align: center;
    text-decoration: none;
  }

  & > p {
    color: white;
  }

  &:hover {
    background-color: var(--text-color-dark-theme);

    & > a {
      color: var(--background-color-dark-theme);
    }

    & > p {
      color: var(--background-color-dark-theme);
    }
  }

  will-change: contents;
}

#profile-menu {
  color: white;
  font-size: 14pt;
}

.profile-menu-container {
  border-radius: 5px;
  border: 2px white solid;
  background-color: var(--background-item-color-dark-theme) !important;
  padding: 10px;
  max-width: 400px;
  min-width: 200px;
}

#user-delete-dialog {
  background-color: transparent;
  max-width: 500px;
}

.user-delete-card {
  background-color: var(--background-item-color-dark-theme);
  color: white;
}

@media (max-width: 768px) {
  #rl-logo-title {
    font-size: 20pt;
  }

  #rl-about-website {
    font-size: 18pt;
    margin-left: 10px;
  }

  .authButton {
    font-size: 12pt;
  }
}
</style>

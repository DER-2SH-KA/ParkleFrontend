<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrentUserStore } from '../scripts/stores/piniaStore'
import { deleteAccount } from '../scripts/api'
import { showAlert } from '../scripts/createToasts'
import { TYPE } from 'vue-toastification'

const currentUserStore = useCurrentUserStore()

const loadingDeleteAccount = ref<boolean>()
const isShowDeleteAccountDialog = ref<boolean>()

const isLogined = computed<boolean>(() => {
  return !!currentUserStore.currentUser
})

const onLogout = () => {
  currentUserStore.setCurrentUser(undefined)
}

const deleteUser = () => {
  loadingDeleteAccount.value = true
  isShowDeleteAccountDialog.value = true
}

const onDeleteUserAccept = async () => {
  await deleteAccount(currentUserStore.currentUser?.id)
    .then((result) => {
      console.info('deleteUser', result)

      showAlert("User's account was deleted!", TYPE.SUCCESS)
      currentUserStore.setCurrentUser(undefined)

      isShowDeleteAccountDialog.value = false
    })
    .catch((error) => {
      console.error('deleteUser', error)
      showAlert("User's account wasn't deleted!", TYPE.ERROR)
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

          <v-menu id="profile-menu" activator="parent">
            <p>Пользователь: {{ currentUserStore.currentUser?.login }}</p>
            <v-btn @click="onLogout">Выйти</v-btn>
            <v-btn :loading="loadingDeleteAccount" @click="deleteUser">Удалить аккаунт</v-btn>
          </v-menu>
        </button>
      </div>
    </div>
  </header>

  <v-dialog id="user-delete-dialog" v-model="isShowDeleteAccountDialog" not-padding>
    <VCol id="user-delete-column">
      <p>Вы точно хотите безвозвратно удалить аккаунт {{ currentUserStore.currentUser?.login }}?</p>
      <VRow id="website-delete-dialog-answer-buttons">
        <VBtn @click="onDeleteUserAccept">Да</VBtn>
        <VBtn @click="onDeleteUserDenied">Отмена</VBtn>
      </VRow>
    </VCol>
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

#user-delete-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  max-width: 500px;
}

#user-delete-column {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  gap: 20px;
  background-color: var(--background-second-color-dark-theme);
  border-radius: 20px;
  padding: 20px;

  & > p {
    color: red;
    font-size: 18pt;
    text-align: center;
  }
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrentUserStore } from './scripts/stores/piniaStore'
import { deleteAccount } from './scripts/api'
import { showAlert } from './scripts/createToasts'
import { TYPE } from 'vue-toastification'

const currentUserStore = useCurrentUserStore()

const loadingDeleteAccount = ref<boolean>()
const isShowDeleteAccountDialog = ref<boolean>()

const isLogined = computed<boolean>(() => {
  return !!currentUserStore.currentUser
})

const logout = () => {
  currentUserStore.setCurrentUser(undefined)
}

const deleteUser = () => {
  loadingDeleteAccount.value = true
  isShowDeleteAccountDialog.value = true
}

const deleteUserAccept = async () => {
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

const deleteUserDenied = () => {
  loadingDeleteAccount.value = false
  isShowDeleteAccountDialog.value = false
}
</script>

<template>
  <header>
    <div id="logo">
      <img src="./resources/img/png/icon.png" alt="Icon" />
      <p>Parkle</p>
    </div>
    <div id="empty"></div>
    <div id="authButtonsContainer">
      <div v-if="!isLogined" class="authButtons">
        <button class="authButton">
          <router-link to="/auth/login">Sing In</router-link>
        </button>
        <button class="authButton">
          <router-link to="/auth/registration">Sing Up</router-link>
        </button>
      </div>
      <div v-else class="authButtons">
        <button class="authButton">
          <p>Profile</p>

          <v-menu id="profile-menu" activator="parent">
            <p>User: {{ currentUserStore.currentUser?.login }}</p>
            <v-btn @click="logout()">Logout</v-btn>
            <v-btn :loading="loadingDeleteAccount" @click="deleteUser">Delete Account</v-btn>
          </v-menu>
        </button>
      </div>
    </div>
  </header>
  <v-dialog id="user-delete-dialog" v-model="isShowDeleteAccountDialog" not-padding>
    <VCol id="user-delete-column">
      <p>Are you sure you want to delete account?</p>
      <VRow id="website-delete-dialog-answer-buttons">
        <VBtn @click="deleteUserAccept">Yes</VBtn>
        <VBtn @click="deleteUserDenied">Cancel</VBtn>
      </VRow>
    </VCol>
  </v-dialog>
</template>

<style lang="scss" scoped>
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

header {
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-second-color-dark-theme);
}

#logo {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: auto;
  margin-left: 20px;
}

#logo > img {
  width: 30pt;
  aspect-ratio: 1;
}

#logo > p {
  color: var(--text-color-dark-theme);
  font-size: 28pt;
  margin-left: 10px;
}

#authButtonsContainer {
  display: flex;
  flex-flow: row wrap;
}

.authButtons {
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: row;
  margin-right: 5px;
}

.authButton {
  background-color: transparent;
  border: 2px var(--text-color-dark-theme) solid;
  border-radius: 5px;

  font-size: 14pt;

  padding: 5px 10px 5px 10px;
  margin: 10px 10px 10px 0px;

  & > a {
    color: var(--text-color-dark-theme);
    text-align: center;
    text-decoration: none;
  }

  & > p {
    color: white;
  }

  &:hover {
    animation: scale-to-one-dot-one ease-in-out 200ms forwards;

    & > a {
      animation: change-a-color ease-in-out 200ms forwards;
      color: var(--background-color-dark-theme);
    }

    & > p {
      animation: change-a-color ease-in-out 200ms forwards;
      color: var(--background-color-dark-theme);
    }
  }
}

#profile-menu {
  color: white;
  font-size: 14pt;
}

@media (max-width: 768px) {
  .authButton {
    font-size: 12pt;
  }
}

@keyframes scale-to-one-dot-one {
  from {
    transform: scale(1);
  }
  to {
    color: var(--background-color-dark-theme);
    background-color: var(--text-color-dark-theme);
    border: 2px var(--background-color-dark-theme) solid;
    transform: scale(1.05);
  }
}

@keyframes change-a-color {
  to {
    color: var(--background-color-dark-theme);
  }
}
</style>

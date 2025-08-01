<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type UserAuthDto, type UserResponseDto } from './scripts/declaration'
import { authorize } from './scripts/api'
import { showAlert } from './scripts/createToasts'
import { TYPE } from 'vue-toastification'
import { useCurrentUserStore } from './scripts/stores/piniaStore'

const router = useRouter()

const loading = ref<boolean>(false)
const passwordVisibleType = ref<string>('password')
const login = ref<string>('')
const password = ref<string>('')

const currentUserStore = useCurrentUserStore()

/* eslint-disable @typescript-eslint/no-unused-vars */
async function submit(event: SubmitEventPromise) {
  loading.value = true
  const userAuthDto: UserAuthDto = {
    login: login.value,
    password: password.value,
  }
  const authorizedUser: UserResponseDto | undefined = await authorize(userAuthDto)
  loading.value = false

  if (authorizedUser === undefined) {
    showAlert('User was not found!', TYPE.ERROR)
  } else {
    showAlert(`Welcome back, ${authorizedUser.login}!`, TYPE.SUCCESS)
    currentUserStore.setCurrentUser(authorizedUser)
    router.go(-1)
  }

  // alert(JSON.stringify(authorizedUser, null, 2))
}

function changeTypeOfPasswordVisible(e: MouseEvent) {
  if (passwordVisibleType.value == 'password') {
    passwordVisibleType.value = 'text'
  } else {
    passwordVisibleType.value = 'password'
  }
}
</script>

<template>
  <main class="main-component">
    <section id="login-page">
      <VForm class="sign-fields" validate-on="input lazy" @submit.prevent="submit">
        <VContainer>
          <VCol>
            <VBtn @click="router.go(-1)">Back</VBtn>
            <!-- Login -->
            <VTextField v-model="login" label="Login" type="text" required />
            <!-- Password -->
            <VRow>
              <VTextField
                v-model="password"
                label="Password"
                :type="passwordVisibleType"
                required
              />
              <v-btn @click="changeTypeOfPasswordVisible">Show</v-btn>
            </VRow>
            <VBtn :loading="loading" class="mt-2" text="Sign In" type="submit" block />
          </VCol>
        </VContainer>
      </VForm>
    </section>
  </main>
</template>

<style lang="scss">
.main-component {
  flex: 1 0 auto;
}

#login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--text-color-dark-theme);
}

.sign-fields {
  min-width: 600px;
}
</style>

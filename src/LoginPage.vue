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

const isFormValid = ref<boolean | null>(null)

const loginRules = [
  (value: string) => {
    if (!!value.trim()) return true

    return 'Login is required!'
  },
  (value: string) => {
    if (value.trim().length <= 10) return true

    return "Login's length must be shorter or equal 10 symbols"
  },
]

const passwordRules = [
  (value: string) => {
    if (!!value.trim()) return true

    return 'Password is required!'
  },
  (value: string) => {
    if (value.trim().length >= 8 && value.trim().length <= 72) return true

    return "Passwords's length must be between 8 and 72 symbols"
  },
]

/* eslint-disable @typescript-eslint/no-unused-vars */
async function submitForm(event: SubmitEventPromise) {
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
  <main>
    <section>
      <VForm
        class="sign-fields"
        v-model="isFormValid"
        validate-on="input"
        @submit.prevent="submitForm"
      >
        <VContainer id="login-container">
          <VCol id="login-column">
            <!-- Login -->
            <VTextField v-model="login" :rules="loginRules" label="Login" type="text" required />
            <!-- Password -->
            <VRow>
              <VTextField
                v-model="password"
                :rules="passwordRules"
                :type="passwordVisibleType"
                label="Password"
                required
              />
              <v-btn @click="changeTypeOfPasswordVisible" text="Show" />
            </VRow>
            <VBtn
              :loading="loading"
              :disabled="!isFormValid"
              class="mt-2"
              text="Sign In"
              type="submit"
              block
            />
            <VBtn @click="router.go(-1)" text="Back" />
          </VCol>
        </VContainer>
      </VForm>
    </section>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  flex: 1 0 auto;
}

section {
  width: 70%;
  max-width: 700px;
}

#login-container {
  background-color: var(--text-color-dark-theme);
  border-radius: 20px;
  // width: 700px;
}

#login-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

@media (max-width: 768px) {
  /*#login-container {
    max-width: 80%;
  }*/

  section {
    width: 90%;
  }
}
</style>

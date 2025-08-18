<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registration } from './scripts/api'
import { type UserCreateDto, type UserResponseDto } from './scripts/declaration'
import { showAlert } from './scripts/createToasts'
import { TYPE } from 'vue-toastification'
import { useCurrentUserStore } from './scripts/stores/piniaStore'

const router = useRouter()

const loading = ref<boolean>(false)
const passwordVisibleType = ref<string>('password')
const login = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')

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

const repeatPasswordRules = [
  (value: string) => {
    if (!!value.trim()) return true

    return 'Repeat password is required!'
  },
  (value: string) => {
    if (value.trim().length >= 8 && value.trim().length <= 72) return true

    return "Repeat passwords's length must be between 8 and 72 symbols"
  },
  (value: string) => {
    if (password.value.trim() == value.trim()) return true

    return 'Repeat password and password must be equal'
  },
]

const regex: RegExp = new RegExp('^(\\S+@\\S+\\.\\S+)$')
const emailRules = [
  (value: string) => {
    if (!!value.trim()) return true

    return 'Email is required!'
  },
  (value: string) => {
    if (regex.test(value.trim())) return true

    return 'Email is not valid'
  },
  (value: string) => {
    if (value.trim().length <= 320) return true

    return "Email's length must be shorter or equal 320 symbols"
  },
]

/* eslint-disable @typescript-eslint/no-unused-vars */
async function submitForm(event: SubmitEventPromise) {
  if (password.value != passwordRepeat.value) {
    showAlert("Password and repeat password aren't same!", TYPE.ERROR)
    return
  }

  loading.value = true
  const userCreateDto: UserCreateDto = {
    roleName: 'USER',
    login: login.value,
    email: email.value,
    password: password.value,
  }
  const createdUser: UserResponseDto | undefined = await registration(userCreateDto)
  loading.value = false

  if (createdUser === undefined) {
    showAlert('User was not created!', TYPE.ERROR)
  } else {
    showAlert(`Welcome, ${createdUser.login}!`, TYPE.SUCCESS)
    currentUserStore.setCurrentUser(createdUser)
    router.go(-1)
  }

  // alert(JSON.stringify(createdUserResponseDto, null, 2))
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
        <VContainer id="registration-container">
          <VCol id="registration-column">
            <!-- Login -->
            <VTextField v-model="login" :rules="loginRules" label="Login" type="text" required />
            <!-- EMail -->
            <VTextField v-model="email" :rules="emailRules" label="Email" type="email" required />
            <!-- Password 1 -->
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
            <!-- Password 2 -->
            <VRow>
              <VTextField
                v-model="passwordRepeat"
                :rules="repeatPasswordRules"
                :type="passwordVisibleType"
                label="Password repeat"
                required
              />
              <v-btn @click="changeTypeOfPasswordVisible" text="Show" />
            </VRow>
            <VBtn
              :loading="loading"
              :disabled="!isFormValid"
              class="mt-2"
              text="Sign Up"
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

#registration-container {
  background-color: var(--text-color-dark-theme);
  border-radius: 20px;
  // width: 700px;
}

#registration-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

@media (max-width: 768px) {
  section {
    width: 90%;
  }
}
</style>

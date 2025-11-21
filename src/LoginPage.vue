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
      <VForm v-model="isFormValid" validate-on="input" @submit.prevent="submitForm">
        <VContainer id="login-container">
          <v-row id="login-column" class="pa-0 ma-0">
            <v-col cols="12" class="pa-0 ma-0">
              <!-- Login -->
              <VTextField
                v-model="login"
                :rules="loginRules"
                placeholder="Логин..."
                type="text"
                variant="solo"
                hide-details
                rounded="lg"
                bg-color="#ebebeb"
                required
              />
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <v-row cols="12" class="pa-0 ma-0">
                <!-- Password -->
                <v-col cols="10" class="pa-0 ma-0">
                  <VTextField
                    v-model="password"
                    :rules="passwordRules"
                    :type="passwordVisibleType"
                    placeholder="Пароль..."
                    variant="solo"
                    hide-details
                    rounded="lg"
                    bg-color="#ebebeb"
                    required
                  />
                </v-col>
                <v-col cols="2" class="pa-0 ma-0">
                  <v-btn
                    @click="changeTypeOfPasswordVisible"
                    text="Show"
                    variant="outlined"
                    height="100%"
                    rounded="lg"
                    style="margin-left: 5px"
                  >
                    <v-icon icon="$eye" color="gray" size="32" />
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <VBtn
                class="mt-0 text-capitalize"
                :loading="loading"
                :disabled="!isFormValid"
                text="Войти"
                type="submit"
                rounded="10px"
                base-color="#6f00ff"
                style="font-size: 12pt"
                block
              />
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <VBtn
                class="text-capitalize"
                @click="router.go(-1)"
                text="Назад"
                style="font-size: 12pt"
                block
              />
            </v-col>
          </v-row>
        </VContainer>
      </VForm>
    </section>
  </main>
</template>

<style lang="scss" scoped>
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

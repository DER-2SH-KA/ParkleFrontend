<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registration } from './scripts/api'
import { type UserCreateDto, type UserResponseDto } from './scripts/declaration'
import { showAlert } from './scripts/createToasts'
import { TYPE } from 'vue-toastification'
import { useCurrentUserStore } from './scripts/stores/piniaStore'
import { loginRules, passwordRules, emailRules } from './scripts/validationRules'

const router = useRouter()

const loading = ref<boolean>(false)
const passwordVisibleType = ref<string>('password')
const passwordRepeatVisibleType = ref<string>('password')
const login = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')

const currentUserStore = useCurrentUserStore()

const isFormValid = ref<boolean | null>(null)

const repeatPasswordRules = passwordRules.concat([
  (value: string) => {
    if (password.value.trim() == value.trim()) return true

    return 'Пароли должны совпадать!'
  },
])

/* eslint-disable @typescript-eslint/no-unused-vars */
async function submitForm(event: SubmitEventPromise) {
  if (password.value != passwordRepeat.value) {
    showAlert('Пароль и повторный пароль должны быть идентичны!', TYPE.ERROR)
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
    showAlert('Пользователь не был создан!', TYPE.ERROR)
  } else {
    showAlert(`Привет, ${createdUser.login}!`, TYPE.SUCCESS)
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

function changeTypeOfPasswordRepeatVisible(e: MouseEvent) {
  if (passwordRepeatVisibleType.value == 'password') {
    passwordRepeatVisibleType.value = 'text'
  } else {
    passwordRepeatVisibleType.value = 'password'
  }
}
</script>

<template>
  <main>
    <section>
      <VForm v-model="isFormValid" validate-on="input" @submit.prevent="submitForm">
        <VContainer id="registration-container">
          <v-row id="registration-column" class="pa-0 ma-0">
            <v-col cols="12" class="pa-0">
              <!-- Title -->
              <p style="text-align: center; font-size: 18pt"><strong>Регистрация</strong></p>
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <!-- Login -->
              <VTextField
                v-model="login"
                :rules="loginRules"
                placeholder="Логин..."
                append-inner-icon="$account"
                variant="solo"
                type="text"
                bg-color="#ebebeb"
                required
              />
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <!-- EMail -->
              <VTextField
                v-model="email"
                :rules="emailRules"
                placeholder="Электронная@почта.ru"
                append-inner-icon="$email_at"
                variant="solo"
                type="email"
                bg-color="#ebebeb"
                required
              />
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <v-row cols="12" class="pa-0 ma-0">
                <v-col cols="12" class="pa-0 ma-0">
                  <!-- Password 1 -->
                  <VTextField
                    v-model="password"
                    :rules="passwordRules"
                    :type="passwordVisibleType"
                    placeholder="Пароль..."
                    append-inner-icon="$eye"
                    variant="solo"
                    bg-color="#ebebeb"
                    required
                    @click:append-inner="changeTypeOfPasswordVisible"
                  />
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <v-row class="pa-0 ma-0">
                <v-col cols="12" class="pa-0 ma-0">
                  <!-- Password 2 -->
                  <VTextField
                    v-model="passwordRepeat"
                    :rules="repeatPasswordRules"
                    :type="passwordRepeatVisibleType"
                    placeholder="Повтор пароля..."
                    append-inner-icon="$eye"
                    variant="solo"
                    bg-color="#ebebeb"
                    required
                    @click:append-inner="changeTypeOfPasswordRepeatVisible"
                  />
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <VBtn
                class="text-capitalize"
                :loading="loading"
                :disabled="!isFormValid"
                text="Регистрация"
                type="submit"
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

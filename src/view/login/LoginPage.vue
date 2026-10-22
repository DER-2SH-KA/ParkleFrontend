<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  type ErrorResponseDto,
  type UserAuthDto,
  type UserResponseDto,
} from '@/scripts/declaration.ts'
import { authorize } from '@/scripts/api/userApi.ts'
import { showAlert } from '@/scripts/createToasts.ts'
import { TYPE } from 'vue-toastification'
import { useCurrentUserStore } from '@/scripts/stores/piniaStore.ts'
import { isUserResponseDto } from '@/scripts/typeGuards.ts'
import { loginRules, passwordRules } from '@/scripts/validationRules.ts'

const router = useRouter()

const loading = ref<boolean>(false)
const passwordVisibleType = ref<string>('password')
const login = ref<string>('')
const password = ref<string>('')

const currentUserStore = useCurrentUserStore()

const isFormValid = ref<boolean | null>(null)

const loginTextFieldCounter = 50
const passwordTextFieldCounter = 72

/* eslint-disable @typescript-eslint/no-unused-vars */
async function onSubmitLoginForm(event: SubmitEventPromise) {
  loading.value = true

  const userAuthDto: UserAuthDto = {
    login: login.value,
    password: password.value,
  }
  const responseDto: UserResponseDto | ErrorResponseDto = await authorize(userAuthDto)

  loading.value = false

  if (isUserResponseDto(responseDto)) {
    currentUserStore.setCurrentUser(responseDto)
    showAlert(`Привет, ${responseDto.login}!`, TYPE.SUCCESS)
    router.replace('/')
  } else {
    showAlert(responseDto.messageForClient, TYPE.ERROR)
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function changeTypeOfPasswordVisible(e: MouseEvent) {
  if (passwordVisibleType.value == 'password') {
    passwordVisibleType.value = 'text'
  } else {
    passwordVisibleType.value = 'password'
  }
}
</script>

<template>
  <v-container class="d-flex align-center fill-height pa-4" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-sheet class="pa-6" color="surface" elevation="3" rounded="lg">
          <v-form v-model="isFormValid" @submit.prevent="onSubmitLoginForm">
            <!-- Title -->
            <h2 class="text-center font-weight-bold mb-7">Авторизация</h2>

            <!-- Login -->
            <v-text-field
              class="py-2"
              v-model="login"
              placeholder="Логин..."
              append-inner-icon="$account"
              :counter="loginTextFieldCounter"
              :rules="loginRules"
              variant="solo"
              required
            />

            <!-- Password -->
            <v-text-field
              class="pb-4"
              v-model="password"
              placeholder="Пароль..."
              :type="passwordVisibleType"
              :append-inner-icon="passwordVisibleType === 'password' ? '$eye' : '$eye_closed'"
              :counter="passwordTextFieldCounter"
              :rules="passwordRules"
              variant="solo"
              required
              @click:append-inner="changeTypeOfPasswordVisible"
            />

            <!-- Buttons -->
            <v-btn
              text="Войти"
              type="submit"
              color="primary"
              :loading="loading"
              :disabled="!isFormValid"
              block
              class="mb-3"
              style="font-size: 12pt"
            />

            <v-btn text="Назад" block style="font-size: 12pt" @click="router.go(-1)" />
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

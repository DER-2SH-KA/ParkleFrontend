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
  <div class="login__background">
    <v-card class="ma-5" rounded="20">
      <v-form v-model="isFormValid" @submit.prevent="onSubmitLoginForm">
        <v-container>
          <v-row>
            <!-- Title -->
            <v-col cols="12">
              <p class="text-center login_card__title"><strong>Вход</strong></p>
            </v-col>

            <!-- Login -->
            <v-col cols="12">
              <v-text-field
                v-model="login"
                placeholder="Логин..."
                append-inner-icon="$account"
                type="text"
                :counter="loginTextFieldCounter"
                required
              />
            </v-col>

            <!-- Password -->
            <v-col cols="12">
              <v-text-field
                v-model="password"
                @click:append-inner="changeTypeOfPasswordVisible"
                :type="passwordVisibleType"
                placeholder="Пароль..."
                :append-inner-icon="passwordVisibleType == 'password' ? '$eye' : '$eye_closed'"
                :counter="passwordTextFieldCounter"
                required
              />
            </v-col>

            <!-- Buttons -->
            <v-col cols="12">
              <v-btn
                text="Войти"
                type="submit"
                color="primary"
                :loading="loading"
                :disabled="!isFormValid"
                block
              />
            </v-col>

            <v-col cols="12">
              <v-btn text="Назад" @click="router.go(-1)" block />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<style lang="css" scoped>
.login__background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login_card__title {
  font-size: 16pt;
}

.v-text-field .v-input__details {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding-inline: 12px;
  background-color: transparent;
}
</style>

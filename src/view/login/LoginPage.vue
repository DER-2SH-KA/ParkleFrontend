<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  type ErrorResponseDto,
  type UserAuthDto,
  type UserResponseDto,
} from '../../scripts/declaration.ts'
import { authorize } from '../../scripts/api/userApi.ts'
import { showAlert } from '../../scripts/createToasts.ts'
import { TYPE } from 'vue-toastification'
import { useCurrentUserStore } from '../../scripts/stores/piniaStore.ts'
import { loginRules, passwordRules } from '../../scripts/validationRules.ts'
import { isUserResponseDto } from '../../scripts/typeGuards.ts'
import FooterComponent from '../footer/FooterComponent.vue'

const router = useRouter()

const loading = ref<boolean>(false)
const passwordVisibleType = ref<string>('password')
const login = ref<string>('')
const password = ref<string>('')

const currentUserStore = useCurrentUserStore()

const isFormValid = ref<boolean | null>(null)

/* eslint-disable @typescript-eslint/no-unused-vars */
async function submitForm(event: SubmitEventPromise) {
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
    router.go(-1)
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
  <main>
    <section>
      <v-form v-model="isFormValid" validate-on="input" @submit.prevent="submitForm">
        <v-container>
          <v-row>
            <!-- Title -->
            <v-col>
              <p><strong>Вход</strong></p>
            </v-col>

            <!-- Login -->
            <v-col>
              <v-text-field
                v-model="login"
                :rules="loginRules"
                placeholder="Логин..."
                append-inner-icon="$account"
                type="text"
              />
            </v-col>

            <!-- Password -->
            <v-col>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :type="passwordVisibleType"
                    placeholder="Пароль..."
                    :append-inner-icon="passwordVisibleType == 'password' ? '$eye' : '$eye_closed'"
                    @click:append-inner="changeTypeOfPasswordVisible"
                  />
                </v-col>
              </v-row>
            </v-col>

            <v-col>
              <v-btn :loading="loading" :disabled="!isFormValid" text="Войти" type="submit" />
            </v-col>

            <v-col>
              <v-btn @click="router.go(-1)" text="Назад" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </section>
  </main>

  <FooterComponent />
</template>

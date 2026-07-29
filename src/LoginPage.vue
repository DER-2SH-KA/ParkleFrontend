<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  type ErrorResponseDto,
  type UserAuthDto,
  type UserResponseDto,
} from './scripts/declaration'
import { authorize } from './scripts/api/userApi'
import { showAlert } from './scripts/createToasts'
import { TYPE } from 'vue-toastification'
import { useCurrentUserStore } from './scripts/stores/piniaStore'
import { loginRules, passwordRules } from './scripts/validationRules'
import { isUserResponseDto } from './scripts/typeGuards'
import FooterComponent from './subComponents/FooterComponent.vue'

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
        <v-container id="login-form__container">
          <v-row id="login-column" class="pa-0 ma-0">
            <!-- Title -->
            <v-col cols="12" class="pa-0">
              <p style="text-align: center; font-size: 18pt"><strong>Вход</strong></p>
            </v-col>

            <!-- Login -->
            <v-col cols="12" class="pa-0 ma-0">
              <v-text-field
                v-model="login"
                :rules="loginRules"
                placeholder="Логин..."
                append-inner-icon="$account"
                type="text"
                variant="solo"
                rounded="xl"
                bg-color="#ebebeb"
                required
              />
            </v-col>

            <!-- Password -->
            <v-col cols="12" class="ma-0">
              <v-row cols="12" class="pa-0">
                <v-col cols="12" class="pa-0 ma-0">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :type="passwordVisibleType"
                    placeholder="Пароль..."
                    :append-inner-icon="passwordVisibleType == 'password' ? '$eye' : '$eye_closed'"
                    variant="solo"
                    rounded="xl"
                    bg-color="#ebebeb"
                    required
                    @click:append-inner="changeTypeOfPasswordVisible"
                  />
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" class="pa-0">
              <v-btn
                class="mt-0 text-capitalize"
                :loading="loading"
                :disabled="!isFormValid"
                text="Войти"
                type="submit"
                rounded="xl"
                base-color="#6f00ff"
                style="font-size: 12pt"
                block
              />
            </v-col>

            <v-col cols="12" class="pa-0">
              <v-btn
                class="text-capitalize"
                @click="router.go(-1)"
                text="Назад"
                rounded="xl"
                style="font-size: 12pt"
                block
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </section>
  </main>

  <FooterComponent class="footer__footer-component" />
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

#login-form__container {
  background: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

#login-column {
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

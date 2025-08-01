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

/* eslint-disable @typescript-eslint/no-unused-vars */
async function submit(event: SubmitEventPromise) {
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
    currentUserStore.currentUser = createdUser
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
  <main class="main-component">
    <section id="registration">
      <VForm class="sign-fields" validate-on="input lazy" @submit.prevent="submit">
        <VContainer>
          <VCol>
            <VBtn @click="router.go(-1)">Back</VBtn>
            <!-- Login -->
            <VTextField v-model="login" label="Login" type="text" required />
            <!-- EMail -->
            <VTextField v-model="email" label="Email" type="email" required />
            <!-- Password 1 -->
            <VRow>
              <VTextField
                v-model="password"
                label="Password"
                :type="passwordVisibleType"
                required
              />
              <v-btn @click="changeTypeOfPasswordVisible">Show</v-btn>
            </VRow>
            <!-- Password 2 -->
            <VRow>
              <VTextField
                v-model="passwordRepeat"
                label="Password repeat"
                :type="passwordVisibleType"
                required
              />
              <v-btn @click="changeTypeOfPasswordVisible">Show</v-btn>
            </VRow>
            <VBtn :loading="loading" class="mt-2" text="Sign Up" type="submit" block />
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

#registration {
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

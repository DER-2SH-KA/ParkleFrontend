<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref<boolean>(false)
const passwordVisibleType = ref<string>('password')
const username = ref<string>('')
const password = ref<string>('')

async function submit(event: SubmitEventPromise) {
  loading.value = true
  const results = await event
  loading.value = false
  alert(JSON.stringify(results, null, 2))
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
            <VTextField v-model="username" label="Login" type="text" required />
            <!-- Password -->
            <VRow>
              <VTextField
                v-model="password"
                label="Password"
                :type="passwordVisibleType"
                required
              />
              <button @click="changeTypeOfPasswordVisible">Show</button>
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

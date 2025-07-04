<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify'
import FooterComponent from './FooterComponent.vue'
import { ref } from 'vue'

const loading = ref<boolean>(false)
const passwordVisibleType = ref<string>('password')
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')

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
    <section id="registration">
      <VForm validate-on="input lazy" @submit.prevent="submit">
        <VContainer>
          <VCol>
            <!-- Login -->
            <VTextField v-model="username" label="Login" type="text" required />
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
              <button @click="changeTypeOfPasswordVisible">Show</button>
            </VRow>
            <!-- Password 2 -->
            <VRow>
              <VTextField
                v-model="passwordRepeat"
                label="Password repeat"
                :type="passwordVisibleType"
                required
              />
              <button @click="changeTypeOfPasswordVisible">Show</button>
            </VRow>
            <VBtn :loading="loading" class="mt-2" text="Sign Up" type="submit" block />
          </VCol>
        </VContainer>
      </VForm>
    </section>
  </main>
  <FooterComponent class="footer-component" />
</template>

<style lang="scss">
.main-component {
  flex: 1 0 auto;
}

#registration {
  background-color: purple;
}

.footer-component {
  flex: 0 0 auto;
}
</style>

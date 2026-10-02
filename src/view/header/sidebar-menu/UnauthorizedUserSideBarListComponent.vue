<script setup lang="ts">
import routesApi from '@/scripts/api/routes'
</script>

<template>
  <v-list class="d-flex flex-column justify-center align-space-between">
    <v-list-item>
      <!-- Top side bar menu part -->
      <v-list>
        <v-list-item-action>
          <router-link :to="routesApi.about">Справка</router-link>
        </v-list-item-action>

        <v-divider />
      </v-list>
    </v-list-item>

    <!-- Bottom side bar menu part -->
    <v-list-item>
      <v-list>
        <router-link :to="routesApi.auth.base + routesApi.auth.login">Войти</router-link>
      </v-list>
    </v-list-item>
  </v-list>
</template>

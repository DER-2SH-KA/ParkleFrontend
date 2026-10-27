<script lang="ts" setup>
import routesApi from '@/scripts/api/routes.ts'

const routeToSettingsTags = routesApi.settings.base + routesApi.settings.tags
</script>

<template>
  <v-card rounded="lg">
    <h2 class="text-center">Настройки</h2>

    <v-divider />

    <v-list>
      <v-list-item> Пользователь </v-list-item>

      <v-divider />

      <v-list-item>
        <router-link :to="routeToSettingsTags">Теги</router-link>
      </v-list-item>
    </v-list>
  </v-card>
</template>

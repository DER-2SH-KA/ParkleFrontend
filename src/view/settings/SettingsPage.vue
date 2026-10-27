<script setup lang="ts">
import SettingsPageList from '@/view/settings/SettingsPageList.vue'
</script>

<template>
  <v-container class="d-flex flex-column flex-1-0-0 h-100" fluid>
    <v-row justify="center" align="start">
      <!-- Settings List -->
      <v-col cols="12" md="6" xl="4">
        <SettingsPageList />
      </v-col>
    </v-row>
  </v-container>
</template>

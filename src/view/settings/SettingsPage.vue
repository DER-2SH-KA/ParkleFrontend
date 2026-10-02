<script setup lang="ts">
import SettingsPageList from '@/view/settings/SettingsPageList.vue'
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
</script>

<template>
  <v-app-bar>
    <HeaderComponent />
  </v-app-bar>

  <v-main>
    <v-container>
      <v-row>
        <!-- Settings List -->
        <v-col>
          <SettingsPageList />
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <v-footer>
    <FooterComponent />
  </v-footer>
</template>

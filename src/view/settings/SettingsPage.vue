<script setup lang="ts">
import SettingsPageList from '@/view/settings/SettingsPageList.vue'
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
</script>

<template>
  <HeaderComponent class="header-component" />
  <div class="main-component">
    <v-container
      class="settings_page__general_container"
      style="background: red"
      cols="12"
      md="8"
      lg="6"
    >
      <v-row>
        <!-- Settings List -->
        <v-col style="background-color: green" cols="12" sm="3">
          <SettingsPageList />
        </v-col>

        <!-- Settings Current List Item Content -->
        <v-col style="background-color: blue" cols="12" sm="9"></v-col>
      </v-row>
    </v-container>
  </div>
  <FooterComponent class="footer__footer-component" />
</template>

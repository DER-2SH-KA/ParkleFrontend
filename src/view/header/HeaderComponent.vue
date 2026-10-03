<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrentUserStore } from '@/scripts/stores/piniaStore'
import routesApi from '@/scripts/api/routes'
import UnauthorizedUserSideBarListComponent from '@/view/header/sidebar-menu/UnauthorizedUserSideBarListComponent.vue'
import AuthorizedUserSideBarListComponent from '@/view/header/sidebar-menu/AuthorizedUserSideBarListComponent.vue'
import { useTheme } from 'vuetify'

const navigationDrawer = ref<boolean>(false)
const theme = useTheme()

const currentUserStore = useCurrentUserStore()

const isLogined = computed<boolean>(() => {
  return !!currentUserStore.currentUser
})
</script>

<template>
  <v-app-bar
    density="compact"
    scroll-behavior="elevate"
    scroll-threshold="0"
    height="80"
    color="surface"
  >
    <v-app-bar-title>
      <router-link :to="routesApi.home" class="d-flex align-center flex-row text-decoration-none">
        <img src="../../resources/img/svg/icon.svg" alt="Icon" width="45" height="45" />
        <p id="header__title_text" class="text-"><span class="text-primary">П</span>аркл</p>
      </router-link>
    </v-app-bar-title>

    <template v-slot:append>
      <div>
        <v-icon-btn icon="$themeLightDark" @click="theme.cycle(['light', 'dark'])" />

        <v-app-bar-nav-icon @click.stop="navigationDrawer = !navigationDrawer" />
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="navigationDrawer" location="end" temporary>
    <UnauthorizedUserSideBarListComponent v-if="!isLogined" />

    <AuthorizedUserSideBarListComponent v-else />
  </v-navigation-drawer>
</template>

<style lang="css">
#header__title_text {
  text-decoration: none;
  font-size: 28pt;
  font-weight: 500;
  margin: 10px;
}
</style>

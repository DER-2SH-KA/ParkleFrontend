import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../../view/home/HomePage.vue'
import LoginPage from '../../view/login/LoginPage.vue'
import AboutSitePage from '../../view/about/AboutSitePage.vue'
import SettingsPage from '@/view/settings/SettingsPage.vue'
import routesApi from '@/scripts/api/routes.ts'

const routes = [
  { path: routesApi.home, component: HomePage },
  { path: routesApi.auth.base + routesApi.auth.login, component: LoginPage },
  { path: routesApi.about, component: AboutSitePage },
  { path: routesApi.settings.base, component: SettingsPage },
]

export const routerConfigured = createRouter({
  history: createWebHistory(),
  routes: routes,
})

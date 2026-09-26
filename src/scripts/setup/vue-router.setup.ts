import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../../view/home/HomePage.vue'
import LoginPage from '../../view/login/LoginPage.vue'
import AboutSitePage from '../../view/about/AboutSitePage.vue'
import SettingsPage from '@/view/settings/SettingsPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/auth/login', component: LoginPage },
  { path: '/about', component: AboutSitePage },
  { path: '/settings', component: SettingsPage },
]

export const routerConfigured = createRouter({
  history: createWebHistory(),
  routes: routes,
})

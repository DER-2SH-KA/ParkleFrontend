import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../../HomePage.vue'
import LoginPage from '../../LoginPage.vue'
import AboutSite from '../../AboutSite.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/auth/login', component: LoginPage },
  { path: '/about', component: AboutSite },
]

export const routerConfigured = createRouter({
  history: createWebHistory(),
  routes: routes,
})

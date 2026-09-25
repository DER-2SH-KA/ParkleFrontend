import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../../view/home/HomePage.vue'
import LoginPage from '../../view/login/LoginPage.vue'
import AboutSite from '../../view/about/AboutSite.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/auth/login', component: LoginPage },
  { path: '/about', component: AboutSite },
]

export const routerConfigured = createRouter({
  history: createWebHistory(),
  routes: routes,
})

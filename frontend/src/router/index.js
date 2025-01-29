import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../Pages/HomePage.vue'
import LoginPage from '../Pages/LoginPage.vue'
import DashboardPage from '../Pages/DashboardPage.vue'
import RegisterPage from '../Pages/RegisterPage.vue'
import TestUploadPage from '../Pages/TestUploadPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/dashboard',
      name: 'dashbaord',
      component: DashboardPage
    },
    {
      path: '/upload',
      name: 'upload',
      component: TestUploadPage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../Pages/AboutPage.vue'),
    // },
  ],
})

export default router

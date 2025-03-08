import { createRouter, createWebHistory } from 'vue-router'
import DecksPage from '@/views/DecksPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/decks',
    },
    {
      path: '/decks',
      name: 'decks',
      component: DecksPage,
    },
  ],
})

export default router

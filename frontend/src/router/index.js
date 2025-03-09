import { createRouter, createWebHistory } from 'vue-router'
import DecksView from '@/views/DecksView.vue'
import PlayView from '@/views/PlayView.vue'

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
      component: DecksView,
    },
    {
      path: '/play/:deckId',
      name: 'play',
      component: PlayView,
      props: true,
    }
  ],
})

export default router

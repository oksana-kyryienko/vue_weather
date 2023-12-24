// router.js

import { createRouter, createWebHistory } from 'vue-router'
import WeatherView from '../views/WeatherView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather',
      component: WeatherView
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: FavoritesView,
      props: (route) => ({ weatherData: route.query.weatherData })
    }
  ]
})

export default router

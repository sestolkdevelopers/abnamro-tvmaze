import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowDetailsView from '@/views/ShowDetailsView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Shows overview'
    }
  },
  {
    path: '/show/:id',
    name: 'show-details',
    component: ShowDetailsView,
    meta: {
      title: 'Show'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ABN Amro Assignment`

  next()
})

export default router

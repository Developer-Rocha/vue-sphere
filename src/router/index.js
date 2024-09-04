import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article',
      name: '/article',
      component: () => import('../views/OverviewArticlesView.vue')
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: ArticleDetailView
    }
  ]
})

export default router

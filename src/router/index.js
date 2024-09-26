import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ContactView from '@/views/ContactView.vue'
import Tr from '@/i18n/translation'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/:locale?',
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'article',
          name: 'Article',
          component: () => import('../views/OverviewArticlesView.vue')
        },
        {
          path: 'article/:slug',
          name: 'ArticleDetail',
          component: ArticleDetailView
        },
        {
          path: 'contact',
          name: 'Contact',
          component: ContactView
        }
      ]
    }
  ]
})

export default router

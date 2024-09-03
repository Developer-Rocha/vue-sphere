import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import OverviewArticlesView from '../views/OverviewArticlesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article-overview',
      name: 'OverviewArticle',
      component: OverviewArticlesView
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: ArticleDetailView
    }
  ]
})

export default router

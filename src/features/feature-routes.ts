import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/features/home-page/HomePage.vue'
import Dashboard from '@/features/home-page/components/dashboard.vue'
import PostPreview from '@/features/home-page/components/post-preview.vue'
import Editor from '@/features/editor/editor.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'editor',
          name: 'Editor',
          component: Editor,
        },
        {
          path: 'post/:id',
          name: 'PostPreview',
          component: PostPreview,
        },
        {
          path: '',
          redirect: { name: 'Dashboard' }
        }
      ],
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhylosophyView from '../views/PhylosophyView.vue'
import ArchivesView from '../views/Archives.vue'
import AboutView from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/philosophy',
      name: 'philosophy',
      component: PhylosophyView,
    },
    {
      path: '/archives',
      name: 'archives',
      component: ArchivesView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    }
  ],
})

export default router

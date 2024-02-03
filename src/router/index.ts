import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrcamentoView from '../views/OrcamentoView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import ProjectView from '@/views/ProjectView.vue'
import ScrollTrigger from 'gsap/ScrollTrigger';
import {configGsap} from '../utils/gsapAll'
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/portfolio',
    name: 'Portfólio',
    component: PortfolioView
  },
  {
    path: '/orcamento',
    name: 'Orçamento',
    component: OrcamentoView
  },
  {
    path: '/sobre-nos',
    name: 'Sobre Nós',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/portfolio/:projectId',
    name: 'Projeto',
    component: ProjectView,
    props: true
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  next();
  configGsap();
})

export default router

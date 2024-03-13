import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrcamentoView from '../views/OrcamentoView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import ProjectView from '@/views/ProjectView.vue'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from "gsap";
import AboutView from '@/views/AboutView.vue'
import { configGsap } from '@/utils/gsapAll'
gsap.registerPlugin(ScrollTrigger);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
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
    name: 'Sobre nós',
    component: AboutView
  },
  {
    path: '/portfolio/:projectName',
    name: 'Project',
    component: ProjectView,

    props: route => ({
      projectName: route.params.projectName,
    })
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  setTimeout(() => {
    document.querySelector("#nav")?.classList.add("animate-transition");
    setTimeout(() => {
      configGsap()
    window.scrollTo({ top: 0 });
    }, 500);
    setTimeout(() => {
      document.querySelector("#nav")?.classList.remove("animate-transition");
      
    }, 2000);
  }, 1200);

  next()
})

export default router

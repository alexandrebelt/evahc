<template>
  <!--COMPONENTE-->

  <transition name="fade" mode="out-in">
    <HeaderComp />
  </transition>
  <LoadingView />
  <div v-if="!loading">
    <IntroView />
    <TransitionView :routeName="toName" :projectTitle="$store.state.projectName" v-if="showTransition" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div v-if="carregaConteudo">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>

  <FooterComp />

</template>

<script lang="js">
import LocomotiveScroll from 'locomotive-scroll';
import FooterComp from '/src/components/FooterComp.vue';
import HeaderComp from '/src/components/HeaderComp.vue';
import IntroView from '/src/components/IntroView.vue';
import TransitionView from '/src/components/TransitionView.vue';
import LoadingView from '/src/components/LoadingView.vue';
import { defineComponent } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { initMagnets } from './utils/magneticElements.js';
import { configGsap, initGsap } from './utils/gsapAll';
gsap.registerPlugin(ScrollTrigger)

export default defineComponent({

  components: {
    FooterComp,
    HeaderComp,
    IntroView,
    TransitionView,
    LoadingView
  },
  data() {
    return {
      showTransition: false,
      carregaConteudo: true,
      toName: '',
      loading: true,
    }
  },

  mounted() {
    
    const scroll = new LocomotiveScroll({
      //@ts-expect-error - Reconhece de qualquer maneira o el
      el: document.querySelector("[router-view]"),
      smooth: 'easeOutExpo',
    });

    setTimeout(() => {
      initMagnets();
      configGsap();
      window.removeEventListener('resize', initGsap())
      initGsap();
    }, 1000);

    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });

  },
  watch: {

    $route(to, from) {

      if (this.transition) {
        this.showTransition = false;
      } else {
        this.showTransition = true;
        this.carregaConteudo = false;
        this.toName = `${to.name}`
      }

      setTimeout(() => {
        this.carregaConteudo = true;
      }, 1000);
      setTimeout(() => {
        this.showTransition = false;
      }, 3000)
    }
  }
})
</script>

<style lang="scss">
@import 'App.scss'
</style>

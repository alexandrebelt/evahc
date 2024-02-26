<template>
  <!--COMPONENTE-->
  <transition name="fade" mode="out-in">
    <HeaderComp />
  </transition>
  <IntroView />
  <TransitionView :routeName="toName" :projectTitle="$route.params.projectName" v-if="showTransition" />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <div v-if="carregaConteudo">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>

  <FooterComp />
</template>

<script lang="js">
import LocomotiveScroll from 'locomotive-scroll';
import FooterComp from '/src/components/FooterComp.vue';
import HeaderComp from '/src/components/HeaderComp.vue';
import IntroView from '/src/components/IntroView.vue';
import TransitionView from '/src/components/TransitionView.vue';
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
    TransitionView
  },
  data() {
    return {
      showTransition: false,
      carregaConteudo: true,
      toName: ''
    }
  },

  mounted() {
    const scroll = new LocomotiveScroll({
      //@ts-expect-error - Reconhece de qualquer maneira o el
      el: document.querySelector("[router-view]"),
      smooth: 'easeOutExpo',
    });

    initMagnets();
    configGsap();
    window.removeEventListener('resize',initGsap())
    window.addEventListener('resize',initGsap())


  },
  watch: {
    $route(to, from) {
      this.showTransition = true;
      this.carregaConteudo = false;
      this.toName = `${to.name}`
      setTimeout(() => {
        this.carregaConteudo = true;
      }, 1000);
      setTimeout(() => {
        this.showTransition = false;
      }, 2000)
    }
  }
})
</script>

<style lang="scss">
@import url('Responsive.scss');

@font-face {
  font-family: "Urbanist";
  src: url('/src/assets/fonts/Urbanist-VariableFont_wght.ttf') format('truetype'),
    url('/src/assets/fonts/Urbanist-Italic-VariableFont_wght.ttf') format('truetype')
}

@font-face {
  font-family: "Overused";
  src: url('/src/assets/fonts/OverusedGrotesk-Medium.otf') format('opentype'),
    url('/src/assets/fonts/OverusedGrotesk-SemiBold.otf') format('opentype'),
    url('/src/assets/fonts/OverusedGrotesk-Book.otf') format('opentype'),
}

* {
  margin: 0;
  padding: 0;
}

:root {
  --branco: #ffffff;
  --preto: #1C1D20;
  --cinza: #6E6E6E;
  --cinza-quase-claro: #999D9E;
  --cinza-claro: #E5E6E6;
  --container-width: 1440px;
  --urbanist: "Urbanist";
  --overused: "Overused";
}


html,
body {
  background-color: var(--branco);
  position: relative;
  overflow-x: hidden;
  font-family: var(--urbanist);
  font-size: 16px;
  font-display: swap;
}

section {
  min-height: 20vh
}

#app {
  font-family: var(--urbanist);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--preto);
}

.container {
  margin: 0 auto
}
.blank-space{
  margin-bottom: 100px;
}
.container.limit {
  max-width: 100%;
  padding: 80px 20px;
  /*width: 100%;*/
}

p {
  line-height: 2em;
}

a {
  text-decoration: none;
  color: inherit;
}

h2 {
  font-size: 64px;
  font-family: "Overused";
  font-weight: 300;
  line-height: 1.0em;
}

h4 {
  font-size: 34px;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>



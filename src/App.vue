<template>
  <!--COMPONENTE-->
  <TransitionView :routeName="toName" v-if="showTransition" />

  <HeaderComp />
  <router-view />
  <FooterComp />
</template>

<script lang="js">
import LocomotiveScroll from 'locomotive-scroll';
import FooterComp from '/src/components/FooterComp.vue';
import HeaderComp from '/src/components/HeaderComp.vue';
import TransitionView from '/src/components/TransitionView.vue';
import { defineComponent } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { configGsap } from './utils/gsapAll.js';
gsap.registerPlugin(ScrollTrigger)

export default defineComponent({
  components: {
    FooterComp,
    HeaderComp,
    TransitionView
  },
  data() {
    return {
      showTransition: false,
      toName: ''
    }
  },

  mounted() {
    setTimeout(() => {
      configGsap();
    }, 1000);
    const scroll = new LocomotiveScroll({
      //@ts-expect-error - Reconhece de qualquer maneira o el
      el: document.querySelector("#app"),
      smooth: true
    });
  },
  /*watch: {
    $route(to, from) {
      this.showTransition = true;
      this.toName = `${to.name}`
      setTimeout(() => {
        this.showTransition = false;
      }, 3000)
    }
  }*/
})
</script>

<style lang="scss">
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
}
section{
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

.container.limit {
  max-width: var(--container-width);
  padding: 80px 20px;
  /*width: 100%;*/
}
.white-space{
  margin-top:100px;
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
</style>



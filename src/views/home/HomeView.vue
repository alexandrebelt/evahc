<template>
  <div id="home">

    <section id="home-banner">
      <div class="conteiner limit-mid">
        <div class="banner-p-text">
          <p>
            <img src="imgs/seta-diagonal.png" />
            <span>Desenvolvemos soluções visuais
              únicas, construindo marcas <strong>inteligentes</strong> por todo Brasil e ao redor do mundo.</span>
          </p>
        </div>
      </div>
      <div class="container limit">
        <div class="big-name">
          <div class="banner-text">
            <div class="banner-text-wrap">
              <h1>Design, Estratégia & Propósito—</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ProjsComp />

    <MetodologiaComp />

    <ClientesComp />

    <FaqComp />
  </div>
</template>

<script lang="js">
import { gsap } from 'gsap';
import { defineComponent } from 'vue';
import { ScrollTrigger } from 'gsap/all';
import ProjsComp from '@/components/home/ProjsComp.vue';
import MetodologiaComp from '@/components/home/MetodologiaComp.vue';
import ClientesComp from '@/components/home/ClientesComp.vue';
import FaqComp from '@/components/home/FaqComp.vue';
import { initGsap, initScrollLetters } from '@/utils/gsapAll';

gsap.registerPlugin(ScrollTrigger)
const tl = gsap.timeline()
export default defineComponent({
  data() {
    return {
      scrollLetterInitialized: false
    }
  },
  components: {
    ProjsComp,
    MetodologiaComp,
    ClientesComp,
    FaqComp,
  },

  mounted() {
    //window.removeEventListener('resize', initGsap())
    //initGsap()

    if (!this.scrollLetterInitialized) {
      initScrollLetters();
        this.scrollLetterInitialized = true;
    } else {
      return
    }
  },

});
</script>

<style lang="scss">
@import 'HomeView.scss';
</style>

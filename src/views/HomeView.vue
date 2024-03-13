<template>
  <div id="home">

    <section id="home-banner">
      <div class="conteiner limit-mid">
        <div class="banner-p-text">
          <p>
            <img src="seta-diagonal.png" />
            <span>Desenvolvemos soluções visuais
              únicas, construindo marcas <strong>inteligentes</strong> por todo Brasil e ao redor do mundo.</span>
          </p>
        </div>
      </div>
      <div class="container limit">
        <div class="banner-text">
          <h1>Design, Estratégia & Propósito—</h1>
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
      setTimeout(() => {
        initScrollLetters();
        this.scrollLetterInitialized = true;
      }, 1000)
    } else {
      this.scrollLetterInitialized = true;
    }
  },

});
</script>

<style lang="scss">
#home {
  position: relative;
  z-index: 999;
  background: var(--branco);

  h2 {
    font-size: 48px;
    margin-bottom: 30px;
  }

}

#home-banner {
  color: var(--branco);
  position: relative;
  height: 95vh;
  min-height: 300px;
  background-image: url('/public/1.jpg');
  background-position: center 20%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-wrap: nowrap;
  align-items: end;
  z-index: 0;
  flex-direction: column;


  .conteiner.limit-mid {
    width: 100%;
    max-width: 1620px;
    padding-top: 40vh;
    margin: 0 auto;

    .banner-p-text {
      float: right;
      display: flex;
      padding: 0 30px;
      max-width: 430px;
    }
  }

  .container.limit:nth-of-type(2) {
    margin-top: auto;
  }

  .banner-p-text {
    gap: 10px;

    p {
      line-height: 1.7rem !important;
      font-size: 24px;
      font-weight: 300;

      strong {
        font-weight: 500;
      }
    }

    img {
      filter: invert(1) brightness(100);
      max-width: 15px;
      height: auto;
      margin-right: 10px;

    }
  }

  .container {
    //position: relative;
    display: block ruby !important;

    .banner-text {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      position: relative;
    }
  }

  h1 {
    font-family: var(--overused);
    width: max-content;
    bottom: 1vw;
    left: 0;
    font-size: 9.8vw;
    font-weight: 400;
    position: relative;
    display: flex;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    pointer-events: none;
    margin: 0;
    padding: 0;
  }
}
</style>

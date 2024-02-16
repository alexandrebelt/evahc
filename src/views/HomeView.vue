<template>
  <div id="home">

    <section id="home-banner">
      <div class="container limit">
        <h1 class="banner-text">Design, Estratégia & Propósito-</h1>
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

gsap.registerPlugin(ScrollTrigger)
const tl = gsap.timeline()
export default defineComponent({

  components: {
    ProjsComp,
    MetodologiaComp,
    ClientesComp,
    FaqComp,
  },


  methods: {

    initScrollLetters() {
      // Scrolling Letters Both Direction
      // https://codepen.io/GreenSock/pen/rNjvgjo
      // Fixed example with resizing
      // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010

      let direction = 1; // 1 = forward, -1 = backward scroll

      const roll1 = roll(".banner-text", { duration: 18 }),
        scroll = ScrollTrigger.create({
          trigger: document.querySelector('[data-scroll-container]'),
          onUpdate(self) {
            if (self.direction !== direction) {
              direction *= -1;
              gsap.to([roll1], { timeScale: direction, overwrite: true });
            }
          }
        });

      // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
      function roll(targets, vars, reverse) {
        vars = vars || {};
        vars.ease || (vars.ease = "none");
        const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
          }
        }),
          elements = gsap.utils.toArray(targets),
          clones = elements.map(el => {
            let clone = el.cloneNode(true);
            el.parentNode.appendChild(clone);
            return clone;
          }),
          positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], { position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth) }));
        positionClones();
        elements.forEach((el, i) => tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0));
        window.addEventListener("resize", () => {
          let time = tl.totalTime(); // record the current time
          tl.totalTime(0); // rewind and clear out the timeline
          positionClones(); // reposition
          tl.totalTime(time); // jump back to the proper time
        });
        return tl;
      }

    },

  },
  mounted() {
    this.initScrollLetters();
  }
});
</script>

<style lang="scss">
#home {
  position: relative;
  z-index: 9998;
  background: var(--branco);

  h2 {
    font-size: 48px !important;
    margin-bottom: 30px;
  }

}

#home-banner {
  color: var(--branco);
  height: 95vh;
  min-height: 600px;
  background-image: url('/public/1.jpg');
  background-position: center 10%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-wrap: nowrap;
  align-items: end;
  z-index: 0;

  .container {
    position: relative;
  }

  h1 {
    font-family: var(--overused);
    text-align: left;
    width: max-content;
    bottom: 1vw;
    left: 0;
    font-size: 9.8vw;
    font-weight: 400;
  }
}


</style>

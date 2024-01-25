<template>
  <section id="home-banner">
    <h1>Design, Estratégia & Propósito</h1>
  </section>
  <section id="home-projs" class="container limit">
    <div class="projects">
      <div class="project-cover bg-1">

      </div>
      <div class="project-cover bg-2">

      </div>
      <div class="project-cover bg-3">

      </div>
    </div>
  </section>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';


export default defineComponent({

  mounted() {
    gsap.registerPlugin(ScrollTrigger)


    gsap.utils.toArray(".project-cover").forEach((panel, i) => {
      gsap.to(panel, {
        scale: 0.5,

        scrollTrigger: {
          trigger: panel,
          scrub: 1,
          start: "top 20%",
          end: "top 0%",
          pin: true,
          pinSpacing: false
        }
      })
    });

  }

});
</script>

<style lang="scss">
#home-banner {
  color: var(--branco);
  height: 95vh;
  min-height: 600px;
  background-image: url('/public/1.jpg');
  background-position: center 10%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: end;
}

.bg-1 {
  background-color: blue;
}

.bg-2 {
  background: blueviolet;
}

.bg-3 {
  background: green;
}

.project-cover {
  border-radius: 20px;
  margin: 0 auto;
  height: 400px;
  aspect-ratio: 2/3;
  width: 100%
}</style>

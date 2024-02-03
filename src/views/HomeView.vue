<template>
  <div id="home">
    <section id="home-banner">
      <div class="container limit">
        <h1 id="banner-text">Design, Estratégia & Propósito-</h1>
      </div>
    </section>
    <section id="home-projs">
      <div class="projects container limit">
        <div class="project-cover" v-for="proj in projs" :key="proj.id">
          <router-link :to="{ name: 'Projeto', params: { projectId: proj.id } }">
            <div class="project-tags">
              <h3>{{ proj.title.rendered }}</h3>
              <h3 v-for="tagId in proj.tags" :key="tagId">{{ getTagName(tagId) }}</h3>
            </div>
            <div class="project-category">
              <ul>
                <li v-for="categoryId in proj.categories" :key="categoryId">
                  {{ getCategoryName(categoryId) }}
                </li>
              </ul>
            </div>
            <img
              v-if="proj['_embedded'] && proj['_embedded']['wp:featuredmedia'] && proj['_embedded']['wp:featuredmedia'][0].source_url"
              :src="proj['_embedded']['wp:featuredmedia'][0].source_url" :alt="proj.title.rendered + '_thumb'">
          </router-link>
        </div>
      </div>
    </section>

    <section id="metodologia">
      <div class="container limit">
        <div class="metodologia-col1">
          <span>Processo</span>
        </div>
        <div class="metodologia-col2">
          <h2>
            Conheça nossa metodologia
          </h2>
          <div v-for="met in mets" :key="met.id" class="metodologia-row">
            <div class="metodologia-itens">{{ met.nome }}</div>
            <div class="metodologia-descricao">{{ met.descricao }}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq">
      <div class="container limit">
        <div class="faq-col col1">
          <h2>Dúvidas frequentes</h2>
          <p>Não encontrou o que precisava ou possui questões mais complexas? Fale diretamente com a gente pelo Whatsapp.
          </p>
        </div>
        <div class="faq-col col2">
          <div>
            <div v-for="(item, index) in itens" :key="item.id" class="faq-row">
              <div class="faq-wrapper">
                <div class="faq-pergunta" @click="showFaq(index)">{{ item.pergunta }}</div>
                <div class="faq-resposta" :class="{ mostraFaq: activeIndex === index }">
                  <p>{{ item.resposta }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="js">
import { gsap } from 'gsap';
import { defineComponent } from 'vue';
import { ScrollTrigger } from 'gsap/all';
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)
const tl = gsap.timeline()
export default defineComponent({

  data() {
    return {
      mets: [],
      projs: [],
      itens: [],
      activeIndex: null,
      tags: {},
      categories: {},
      dadosCarregados: false,
    }

  },

  methods: {

    initScrollLetters() {
      // Scrolling Letters Both Direction
      // https://codepen.io/GreenSock/pen/rNjvgjo
      // Fixed example with resizing
      // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010

      let direction = 1; // 1 = forward, -1 = backward scroll

      const roll1 = roll("#banner-text", { duration: 18 }),
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


    showFaq(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index
      }
    },



    loadTags() {
      axios.get('https://evahc.com.br/wp-json/wp/v2/tags')
        .then((response) => {
          response.data.forEach((tag) => {
            this.tags[tag.id] = tag.name
          })
        })
    },
    getTagName(tagId) {
      return this.tags[tagId]
    },

    loadCategories() {
      axios.get('https://evahc.com.br/wp-json/wp/v2/categories')
        .then((response) => {
          response.data.forEach((category) => {
            this.categories[category.id] = category.name;
          })
        })
    },
    getCategoryName(categoryId) {
      return this.categories[categoryId]
    }

  },

  mounted() {
    axios.get('metodologia.json') // Corrigi a URL da chamada da API
      .then((response) => (this.mets = response.data.metodologia))
      .catch((error) => console.error(error));
    axios.get('faq.json')
      .then((response) => (this.itens = response.data.faq)).
      then(() => {
        console.log(this.itens)
      })
      .catch((error) => (console.log(error)))

    axios.get('https://evahc.com.br/wp-json/wp/v2/posts?_embed').
      then((response) => {
        this.projs = response.data.slice(0, 3);
        this.loadTags();
        this.loadCategories();
        this.initScrollLetters();

      })
    setTimeout(() => {


      gsap.set(".metodologia-descricao", {
        opacity: 0,
        x: 50
      });
      gsap.set(".metodologia-itens", {
        opacity: 0,
      })
      gsap.set(".metodologia-col1 span", {
        opacity: 0
      })
      gsap.set(".faq-col.col1 h2, .faq-col.col1 p", {
        opacity: 0,
        x: -100
      })
      gsap.set(".faq-wrapper", {
        opacity: 0,
        x: 100
      })
      tl.to("#nav-links", {
        y: -100,
        scrollTrigger: {
          trigger: "body",
          scrub: true,
          start: "0% 0%",
          end: "+=400"
        }
      })
      tl.to("#banner-text", {
        y: -100,
        scrollTrigger: {
          trigger: "body",
          scrub: true,
          start: "0% 0%",
          end: "+=400"
        }
      })
      tl.to('#home-banner', {
        keyframes: {
          "0%": { y: 0 },
          "100%": { y: 100 },
        }, scrollTrigger: {
          trigger: "#home-banner",
          scrub: true,
          start: "top top",
          end: "bottom top",

        }
      })
      gsap.utils.toArray(".project-cover").forEach((panel, i, array) => {
        tl.to(panel, {
          keyframes: {
            "0%": { scale: 1, },
            "80%": { scale: 0.8, },
            "100%": { scale: 0.8, },
          },
          scrollTrigger: {
            trigger: panel,
            scrub: 3,
            start: `70% center+=${100 * i}`,
            end: `+=${1000 * (array.length - i) - 50}`,
            pin: true,
            pinSpacing: false,
          },

        })
      })
      tl.to(".projects", {
        keyframes: {
          "0%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 }
        },
        scrollTrigger: {
          scrub: 1,
          trigger: ".projects",
          start: "top top",
          end: "+=2500"

        }
      })

      tl.to(".metodologia-col1 span", {
        keyframes: {
          "0%": { opacity: 0 },
          "30%": { opacity: 1 },

        },
        scrollTrigger: {
          trigger: ".metodologia-col1",
          scrub: true,
          pin: true,
          start: "top center",
          end: "+=626",
        },
      })
      tl.to(".metodologia-col2 h2", {
        keyframes: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }

        },
        scrollTrigger: {
          trigger: "#metodologia",
          scrub: true,

          start: "top 80%",
          end: "+=200",
        },
      })
      tl.to('.metodologia-descricao, .metodologia-itens', {
        opacity: 1,
        duration: 1,
        x: 0,
        stagger: 1,
        ease: "power1",
        scrollTrigger: {
          trigger: "#metodologia",
          scrub: 2,
          start: "top center",
          end: "center 40%"
        }
      })
      tl.to(".faq-col.col1 h2, .faq-col.col1 p", {
        opacity: 1,
        x: 0,
        stagger: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#faq",
          scrub: true,
          start: "top center",
          end: "center 60%",
        }
      })
      tl.to(".faq-wrapper", {
        opacity: 1,
        x: 0,
        stagger: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#faq",
          scrub: 2.5,
          start: "top 40%",
          end: "center 60%",
        }
      })
    }, 500);
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

#home-projs {
  position: relative;
  height: 180vh;
  min-height: 3500px;
  max-height: 3500px;
  background-color: var(--branco);

  z-index: 999;
}

.projects {
  position: relative;
}

.project-cover {
  border-radius: 20px;
  margin: 0 auto;
  margin-bottom: 50vh;
  width: 100%;
  aspect-ratio: 10/5;
  max-height: 70vh;
  position: relative;

  img {

    width: 100% !important;
  }

  .project-tags {
    position: absolute;
    top: 20px;
  }

  .project-tags {
    position: absolute;
    top: 10px !important;
    left: 10px !important;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    gap: 10px;

  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
  }

  .project-category ul {
    display: flex;
    flex-direction: row;
    gap: 10px;
    position: absolute;
    top: 10px !important;
    right: 10px !important;
    font-size: 12px;

    li {
      background: rgba(0, 0, 0, 0.2);
      color: var(--branco);
      font-family: var(--overused);
      list-style: none;
      padding: 5px 10px;
      border-radius: 20px;
    }
  }
}



#metodologia .container,
#metodologia .container .metodologia-row {
  display: flex;
  flex-direction: row !important;
  gap: 20px;
}

#metodologia .container .metodologia-row {
  display: flex;
  flex-direction: row;
  border-top: 1px solid var(--cinza-claro);
  color: var(--cinza) !important;
  margin-bottom: 50px;
  padding-top: 20px;
}

#metodologia .container .metodologia-col2 {
  display: flex;
  flex-direction: column !important;
}

.metodologia-col1 {
  width: 15% !important;
  text-transform: uppercase;
  color: var(--cinza-quase-claro);
}

.metodologia-col2 {
  width: 85% !important;

  .metodologia-itens {
    flex-basis: 60%;
    font-size: 22px !important
  }

  .metodologia-descricao {
    flex-basis: 40%;
  }
}


#faq .container {
  display: flex;
  display: row;
  gap: 40px;

  .faq-col {
    flex-basis: 50%;

    &:nth-of-type(1) p {
      max-width: 411px;
    }

    p {
      color: var(--cinza-quase-claro);
    }

    .faq-row {
      border-bottom: 1px solid var(--cinza-claro);

      .faq-pergunta {
        font-size: 22px;
        margin-bottom: 10px;
        margin-top: 20px;
      }

      .faq-pergunta:before {
        content: '+';
        margin-right: 10px;
      }

      .faq-resposta {
        max-height: 0px;
        overflow: hidden;
        margin-bottom: 20px;
        transition: 0.4s;
      }
    }
  }
}

.mostraFaq {
  max-height: 1000px !important;
}
</style>

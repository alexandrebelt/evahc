<template>
  <section id="sobre-banner" class="container limit">
    <div class="blank-space"></div>
    <div class="sobre-banner-container">
      <div class="sobre-banner-col">
        <div class="sobre-banner-text">
          <h2>
            Conexão, Condução,
            Alinhamento.
          </h2>
          <p>Formamos um estúdio independente que valoriza a riqueza proporcionada pelos detalhes, inserindo essa
            precisão em cada projeto que elaboramos.</p>
          <p>Somos calorosos e amamos nos conectar com nossos clientes. Acreditamos que as relações genuínas são
            construídas, concorda?
          </p>
          <p>
            Conduzir e orientar nossos clientes é nosso combustível, envolvendo-os em cada etapa e permitindo que
            vivenciem o desenvolvimento que vai além da marca - a materialização de um sonho.
          </p>
          <p>
            Fundamos a Evahc® com o propósito de compartilhar nossa expertise em brand design. Unindo criatividade,
            estratégia e atenção aos detalhes, buscamos criar marcas verdadeiramente memoráveis."
          </p>
          <em>
            Vitor Reis & Milene Caroline,
            Estrategistas e Brand Designers
          </em>
        </div>
      </div>
      <div class="sobre-banner-col">
        <img src="https://gerenciamento.evahc.com.br/wp-content/uploads/2024/03/foto-evahc-sobre.png" alt="foto-sobre">
      </div>
    </div>
  </section>
  <section id="servicos" class="container limit">
    <div class="servicos">
      <h2>
        <img src="imgs/seta-diagonal.png" class="seta-diagonal" />
        Como podemos te ajudar
      </h2>
      <div class="servicos-itens">
        <div v-for="servico in servicos" :key="servico.id" class="servicos-col">
          <h4>{{ servico.passo }}<br>
            {{ servico.titulo }}
          </h4>
          <p v-html="servico.conteudo">
          </p>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import gsap from 'gsap';
import scrollTrigger from 'gsap/all';
import axios from 'axios';
gsap.registerPlugin(scrollTrigger);

export default {
  data() {
    return {
      servicos: []
    }
  },

  created() {


    axios.get('json/servicos.json').then((response) => {
      this.servicos = response.data.servicos
      console.log(this.servicos)
    }).then(() => {
      gsap.set(".servicos-col", { opacity: 0 })
      gsap.set("#servicos h2", { opacity: 0 })

      gsap.to("#servicos h2", {
        keyframes: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        duration: 2,
        scrollTrigger: {
          trigger: "#servicos",
          scrub: 2,
          start: "top 70%",
          end: "+=300"
        }
      })

      gsap.to(".servicos-col", {
        keyframes: {
          "0%": { opacity: 0, x: 100 },
          "100%": { opacity: 1, x: 0 }
        },
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
          trigger: "#servicos",
          scrub: 2,
          start: "top 70%",
          end: "+=300"
        }
      })
    })
      .catch((error) => { console.log(error) })


  }
}
</script>

<style lang="scss">
@import 'AboutView.scss';
</style>

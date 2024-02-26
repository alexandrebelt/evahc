<template>
  <section id="sobre-banner" class="container limit">
    <div class="blank-space"></div>
    <div class="sobre-banner-container">
      <div class="sobre-banner-col">
        <div class="sobre-banner-text">
          <h4>Para nós, não se trata apenas de criar projetos de marca mas sim dar vida aos sonhos dos nossos clientes.
          </h4>
          <p>Somos um studio independente, apreciamos a riqueza que os detalhes proporcionam e fazemos questão de
            incorporar essa precisão em cada projeto que elaboramos.
            Gostamos de nos conectar com nossos clientes , afinal pessoas se conectam com pessoas , concorda? Oferecemos
            um atendimento humanizado e envolvemos os clientes em todo o nosso processo criativo.</p>
          <p>Fundamos a Evahc® com o objetivo de compartilhar nosso conhecimento e expertise em brand design. Unimos nossa
            criatividade, estratégia e atenção aos detalhes para desenvolver identidades visuais autênticas e memoráveis.
          </p>
        </div>
      </div>
      <div class="sobre-banner-col">
        <img src="2.jpg" alt="foto-sobre">
      </div>
    </div>
  </section>
  <section id="servicos" class="container limit">
    <div class="servicos">
      <h2>Como podemos te ajudar</h2>
      <div class="servicos-itens">
        <div class="servicos-col">
          <h4>01<br>
            Naming
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
            tellus. Sed dignissim, metus nec.
          </p>
        </div>
        <div class="servicos-col">
          <h4>02<br>
            Identidade visual
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
            tellus. Sed dignissim, metus nec.
          </p>
        </div>
        <div class="servicos-col">
          <h4>03<br>
            Estratégia de Marca
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
            tellus. Sed dignissim, metus nec.
          </p>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import gsap from 'gsap';
import scrollTrigger from 'gsap/all';
gsap.registerPlugin(scrollTrigger);

export default {
  mounted(){
    const tl = gsap.timeline()
    gsap.set(".servicos-col", {opacity: 0})
    gsap.set("#servicos h2", {opacity: 0})

    gsap.to("#servicos h2", {
      keyframes: {
        "0%" : {opacity: 0},
        "100%" : {opacity: 1}
      },
      duration: 2,
      scrollTrigger: {
        trigger: "#servicos",
        scrub: 2,
        start:"top 70%",
        end:"+=300"
      }
    })

    tl.to(".servicos-col", {
      keyframes: {
        "0%" : {opacity: 0, x:100},
        "100%" : {opacity: 1, x:0}
      },
      stagger: 0.3,
      duration: 1,
      scrollTrigger: {
        trigger: "#servicos",
        scrub: 2,
        start:"top 70%",
        end:"+=300"
      }
    })
  }
}
</script>

<style lang="scss">
.sobre-banner-container {
  display: flex;
  flex-direction: row;
  background-color: var(--preto);
  border-radius: 35px;

  .sobre-banner-col:nth-of-type(1) {
    flex-basis: 45%;
  }

  .sobre-banner-col:nth-of-type(2) {
    flex-basis: 55%;
  }

  .sobre-banner-col {
    color: var(--branco);

    .sobre-banner-text {
      padding: 6em 4em;

      h4 {
        font-family: var(--overused);
      }

      p {
        margin: 40px 0;
      }
    }

    img {
      width: 100%;
      object-fit: cover;
      aspect-ratio: 9/10;
      border-radius: 35px;
      height: 100%;
    }
  }
}

.servicos h2 {
  max-width: 460px;
  margin-bottom: 50px;
}

.servicos-itens {
  display: flex;
  gap: 12.5%;

  .servicos-col {
    flex-basis: 25%;

    h4 {
      margin-bottom: 20px;
    }
    p{
      color:var(--cinza)
    }
  }

}</style>

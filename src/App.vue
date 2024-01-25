<template>
  <!--COMPONENTE-->
  <nav id="nav">
    <div id="nav-links" :class="{'router-color' : isHome}">
      <div class="nav-col">
        <router-link to="/"><span>Evahc Studio©</span></router-link>
      </div>
      <div class="nav-col">
        <router-link to="/portfolio">Portfólio</router-link>
        <router-link to="/sobre-nos">Sobre Nós</router-link>
        <router-link to="/orcamento">Orçamento</router-link>
      </div>
    </div>
  </nav>

  <router-view />

  <!--COMPONENTE-->
  <footer>
    <div id="footer" class="container">
      <div class="footer-contato">
        <h2>Vamos fazer um projeto
          extraordinário juntos?</h2>
        <div class="btn-orcamento">
          <div class="btn-orcamento-in">
            <router-link to="/orcamento">Solicitar Orçamento</router-link>
          </div>
        </div>
        <div class="btn-contato">
          <a href="mailto:contato@evahc.com.br" target="_blank">
            contato@evahc.com.br
          </a>
          <a href="#" target="=_blank">+55 79 9 9999-9999</a> <!--ADICIONAR DEPOIS-->
        </div>
      </div>
      <div class="credits-social">
        <div class="credits-social-col">
          <p>
            Aracaju-SE
          </p>
          <p>
            EvahcStudio - Todos os direitos reservados.
          </p>
        </div>
        <div class="credits-social-col">
          <p>Redes Sociais</p>
          <div class="footer-social">
            <a href="https://www.instagram.com/evahc/" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com/company/evahc" target="_blank">Linkedin</a>
            <a href="https://www.behance.net/evahc" target="_blank">Behance</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="js">
import locomotiveScroll from 'locomotive-scroll';



export default {
  data(){
    return{
      isHome: false,
    }
  },
  mounted() {
    const scroll = new locomotiveScroll({
      el: document.querySelector("#app"),
      smooth: true
    })
  },

  watch:{
    $route(to, from){
      this.isHome = to.path !== '/'
    }
  }
}
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
.router-color{
  color: var(--preto) !important;

}
nav {
  z-index: 9999;
  position: absolute;
  width: 100%;
  font-family: "Overused";

  .nav-col:nth-of-type(2) a {
    font-weight: 300;
  }

  #nav-links {
    padding: 30px;
    color: var(--branco);
    max-width: var(--container-width);
    margin: 0 auto;

  }

  span {
    font-size: 24.75px;
  }

  .nav-col {
    display: flex;
    flex-direction: row;
    gap: 50px;
  }

  a {
    font-weight: bold;
    color: inherit;
    text-decoration: none;
    align-self: center;

  }
}

#nav-links {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between;
}


footer {
  background: var(--preto);
  color: var(--branco);


  #footer {
    padding: 100px 30px 30px;
    max-width: var(--container-width);

    .footer-contato {
      max-width: 1230px;
      margin: 0 auto;
      margin-bottom: 100px;

      .btn-orcamento {
        height: 0;
        border-top: 1px solid var(--cinza);
        position: relative;
        margin: 60px 0;

        .btn-orcamento-in {
          position: absolute;
          right: 10%;
          aspect-ratio: 1;

          background: var(--branco);
          display: flex;
          align-items: center;
          top: -103px !important;
          border-radius: 100px;
          color: var(--preto);

          a {
            max-width: 100px;
            text-align: center;
            padding: 50px;
          }
        }
      }



      h2 {
        max-width: 800px;
        font-family: var(--urbanist) !important;
        font-weight: 600;
      }

      .btn-contato {
        display: flex;
        gap: 10px;

        a {
          border: 1px solid var(--cinza);
          border-radius: 50px;
          padding: 20px 40px;
        }

      }
    }

    .credits-social {
      display: flex;
      flex-direction: row;
      gap: 40px;
      justify-content: space-between;

      .footer-social {
        display: flex;
        flex-direction: row;
        gap: 60px;
        a{
          line-height: 2em;
        }
      }

      .credits-social-col p:nth-of-type(1) {
        color: var(--cinza);
      }
    }
  }
}
</style>



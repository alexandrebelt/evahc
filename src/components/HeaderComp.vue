<template>
    <nav id="nav">
        <div id="nav-links" :class="{ 'router-color': isHome }">
            <div class="nav-col">
                <router-link class="magnetic-small" to="/"><span>Evahc Studio<sup>©</sup></span></router-link>
            </div>
            <div v-if="isMobile">
                <MenuMobile />
            </div>
            <div v-else class="nav-col">
                <router-link class="magnetic-small" to="/portfolio">Portfólio</router-link>
                <router-link class="magnetic-small" to="/sobre-nos">Sobre Nós</router-link>
                <router-link class="magnetic-small" :class="{ 'btn-fundo-cinza': !isHome }"
                    to="/orcamento">Orçamento</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import MenuMobile from '../components/MenuMobile.vue'
import gsap from 'gsap'
import scrollTrigger from 'gsap/all'
gsap.registerPlugin(scrollTrigger);
export default {

    components: {
        MenuMobile
    },
    data() {
        return {
            isHome: false,
            isMobile: false
        }
    },
    mounted() {

        gsap.to("#nav-links", {
            y: -100,
            scrollTrigger: {
                trigger: "body",
                scrub: true,
                start: "top 0%",
                end: "+=200"
            }
        })
        this.checkWidth();
        window.addEventListener("resize", this.checkWidth);
    },
    beforeUnmount() {
        this.checkWidth();
        window.addEventListener("resize", this.checkWidth);
    },

    methods: {
        checkWidth() {
            this.isMobile = window.innerWidth <= 750;
        }
    },

    watch: {

        $route(to, from) {
            this.isHome = to.path !== '/'
        }

    }
}
</script>

<style lang="scss">
.router-color {
    color: var(--preto) !important;
}


nav {

    z-index: 9999;
    position: absolute;
    width: 100%;
    font-family: "Overused";
    top: 0;
    left: 0;

    span sup {

        font-size: 14px;
    }

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
        font-size: 24.75px !important;
    }

    .nav-col {
        display: flex;
        flex-direction: row;
        gap: 50px;

        a:nth-of-type(1) {
            font-weight: 500;
        }
    }

    a {
        font-weight: bold;
        color: inherit;
        text-decoration: none;
        align-self: center;
        transition: background-color 0.5s;

    }

    .btn-fundo-cinza {
        background: var(--cinza-quase-claro);
        padding: 5px 12px;
        border-radius: 50px;
    }
}

#nav-links {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between;
}
</style>
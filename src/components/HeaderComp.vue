<template>
    <nav id="nav">
        <div class="btn-menu-scroll btn-action">
            <span></span>
            <span></span>
        </div>

        <div id="nav-links">
            <div class="nav-col" :class="{ 'router-color': isHome }">
                <router-link class="magnetic-small evahc-logot" to="/"><span>Evahc
                        Studio<sup>©</sup></span></router-link>
            </div>

            <MenuMobile :isHome=isHome />
            <div class="nav-col nav-desktop-resp" :class="{ 'router-color': isHome }">
                <router-link class="magnetic-small" to="/portfolio">Portfólio</router-link>
                <router-link class="magnetic-small" to="/sobre-nos">Sobre nós</router-link>
                <router-link class="magnetic-small btn-header-orcamento" :class="{ 'btn-fundo-cinza': !isHome }"
                    to="/orcamento">Orçamento</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import gsap from 'gsap'
import scrollTrigger from 'gsap/all'
import $ from 'jquery';
import MenuMobile from './MenuMobile.vue';

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
        let btn = document.querySelector("#mobile-btn");


        let container = document.querySelector(".container-menu-mobile")
        let containerTitle = document.querySelector(".container-menu-mobile h5")
        let mobileLinks = document.querySelectorAll(".mobile-links");

        gsap.set(containerTitle, { opacity: 0 })
        gsap.set(container, { x: "110vw" })
        gsap.set(mobileLinks, { x: 500, })
        


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
        },
        toggleMenu() {
            this.mostraMenu = !this.mostraMenu
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
    span{
        color: var(--preto) !important;
    }
    animation: transitionHeader 2s ease !important;
}

.btn-header-orcamento {
    background-color: var(--preto);
    color: var(--branco);
    border-radius: 50px;
}

.open-mobile-menu {
    color: var(--branco) !important;
    animation: transitionHeader 2s ease !important;
}

.animate-transition {
    animation: transitionHeader 2s ease !important;
}


@keyframes transitionHeader {
    0% {
        opacity: 1;
        transform: translatey(-100px);
    }

    15% {
        opacity: 0;
    }

    75% {
        opacity: 0;
        transform: translatey(-100px)
    }

    100% {
        opacity: 1;
        transform: translatey(0px)
    }
}


nav {

    .nav-desktop-resp {
        display: initial;

        @media(max-width:750px) {
            display: none !important;
        }
    }

    #mobile-btn {
        position: absolute;
        display: none;
        top: 30px;
        right: 30px;

        @media(max-width:750px) {
            display: initial;
        }
    }

    z-index: 1000;
    position: absolute;
    width: 100%;
    font-family: "Overused";
    top: 0;

    left: 0;

    .evahc-logot {
        padding: 0;
        font-weight: 500;
    }

    span sup {

        font-size: 14px;
    }

    .nav-col {
        font-weight: 400 !important;
        font-size: 16px;
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
        gap: 40px;
    }

    a {

        color: inherit;
        text-decoration: none;
        align-self: center;
        transition: background-color 0.5s;
        padding: 6px 25px;

    }

    .btn-fundo-cinza {
        background: var(--cinza-quase-claro);
        border-radius: 50px;
    }
}

#nav-links {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between;
}

.btn-menu-scroll {
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background: var(--preto);
    width: 25px;
    height: 25px;
    justify-content: center;
    text-align: center;
    gap: 10px;
    padding: 20px;
    border-radius: 50px;
    transition: 0.3s;
    z-index: 100;

    &:hover {
        background-color: var(--cinza-quase-claro);
    }

    span {
        background-color: var(--branco) !important;
        width: 100%;
        height: 2px;
    }

}



.active-menu {
    transform: none !important;
    span {
        &:nth-of-type(1) {
            transform: rotate(45deg) translate(4px, 5px);
        }

        &:nth-of-type(2) {
            transform: rotate(-45deg) translate(3px, -4px);
        }
    }
}

.btn-menu-scroll span {
    transition: 0.3s;
}
</style>
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
@import 'HeaderComp.scss'
</style>
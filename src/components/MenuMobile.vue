<template>
    <div class="menu-mobile">
        <div id="mobile-btn" class="btn-menu-mobile btn-action">
            Menu
        </div>
        <div :on-click="mostraMenu" class="container-menu-mobile">
            <div class="mobile-menu-content">
                <h5>Navegação</h5>
                <div class="links-menu-mobile">
                    <router-link class="mobile-links btn-action" to="/portfolio">Portfólio</router-link>
                    <router-link class="mobile-links btn-action" to="/sobre-nos">Sobre Nós</router-link>
                    <router-link class="mobile-links btn-action" to="/orcamento">Orçamento</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap';
import scrollTrigger from 'gsap/all';
import $ from 'jquery';
gsap.registerPlugin(scrollTrigger)

export default {
    data() {
        return {
            mostraMenu: false
        }
    },
    mounted() {
        let btn = document.querySelector("#mobile-btn");
        let menu = document.querySelector(".menu-mobile");
        let container = document.querySelector(".container-menu-mobile")
        let containerTitle = document.querySelector(".container-menu-mobile h5")
        let mobileLinks = document.querySelectorAll(".mobile-links");
        let btnAction = document.querySelectorAll(".btn-action")
        const tl = gsap.timeline();

        gsap.set("html", { overflow: 'hidden' })
        gsap.set(containerTitle, { opacity: 0 })
        gsap.set(container, { x: 1000 })
        gsap.set(mobileLinks, { x: 500, })



        if (this.mostraMenu) {
            gsap.to(menu, {
                scrollTrigger: {
                    trigger: "html",
                    pin: true,
                    pinSpacer: true,
                    start: "center top",
                    end: "+=100",
                }
            })
            gsap.set("#nav-links", {
                y: 0

            });
        } else {
            gsap.set("#nav-links", {
                y: 0,
            });
        }

        $(btnAction).each((index, animateClick) => {
            $(animateClick).on("click", () => {
                if (this.mostraMenu) {
                    gsap.to(container, {
                        x: 1000,
                        ease: "power4.out-in"
                    })
                    gsap.to(mobileLinks, {
                        x: 1500,
                        duration: 1,
                        ease: "power4.out-in"
                    })
                    gsap.to(containerTitle, {
                        opacity: 0,
                        duration: 1.5,
                        ease: "power4.out",
                    })
                    this.mostraMenu = false;

                } else {
                    this.mostraMenu = true
                    gsap.to(container, {
                        x: 0,
                        duration: 1.5,
                        ease: "power4.out"
                    })
                    gsap.to(mobileLinks, {
                        x: 0,
                        duration: 1.5,
                        ease: "power4.out",
                        stagger: 0.1,
                    })
                    gsap.to(containerTitle, {
                        opacity: 1,
                        duration: 1,
                        delay: 0.5
                    })

                }
            })
        })

    },
    methods: {

    }
}
</script>

<style lang="scss">
.btn-menu-mobile {
    position: relative;
    z-index: 99999;
    color: var(--branco)
}
.mobile-menu-content{
  margin: auto auto !important;
  width: 90%;
}
.container-menu-mobile {
    background-color: var(--preto);
    color: var(--branco);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 38px;

    h5 {
        font-size: 15px;
        width: 100%;
        margin: 0 auto;
        text-align: right;
        border-bottom: 1px solid var(--cinza);
        padding-bottom: 10px
    }

    .links-menu-mobile {
        display: inline-flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px;
        margin-right: auto;


        a {
            margin-right: auto;
            text-transform: uppercase;
            font-weight: 500;
            font-family: var(--urbanist);
        }

        .router-link-active {
            &:after {
                content: " •";
                scale: 1.5;

            }
        }
    }
}
</style>
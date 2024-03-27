<template>
    <div class="menu-mobile-btn">
        <div class="menu-mobile">

            <div id="mobile-btn" :class="{ 'router-color': isHome }" class="btn-action">
                <span :class="{ 'open-mobile-menu': mostraMenu }">
                    Menu
                </span>
            </div>

            <div :on-click="mostraMenu" class="container-menu-mobile">
                <div class="mobile-menu-content">
                    <h5>Navegação</h5>
                    <div class="links-menu-mobile">
                        <router-link class="mobile-links btn-action" to="/">Home</router-link>
                        <router-link class="mobile-links btn-action" to="/portfolio">Portfólio</router-link>
                        <router-link class="mobile-links btn-action" to="/sobre-nos">Sobre nós</router-link>
                        <router-link class="mobile-links btn-action" to="/orcamento">Orçamento</router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import gsap from 'gsap';
import scrollTrigger from 'gsap/all';
import $ from 'jquery'

gsap.registerPlugin(scrollTrigger)

export default {
    props: ['isHome'],


    mounted() {
        let containerTitle = document.querySelector(".container-menu-mobile h5")
        let mobileLinks = document.querySelectorAll(".mobile-links");
        let container = document.querySelector(".container-menu-mobile");
        let menu = document.querySelector(".menu-mobile");
        let btnAction = document.querySelectorAll(".btn-action")
        let btnScroll = document.querySelector(".btn-menu-scroll")
        let navLinks = document.querySelector("#nav-links");

        const tl = gsap.timeline();
        gsap.set('.btn-menu-scroll', { y: -200 })
        gsap.from('.btn-menu-scroll', { y: -200 })
        gsap.to(".btn-menu-scroll", {
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: "html",
                start: "2% top",
                end: "+=200",
                scrub: true,
                invalidateOnRefresh: true,
            }
        })

        if (this.mostraMenu) {

            gsap.set("#nav-links", {
                y: 0,
            });

        } else {
            gsap.set("#nav-links", {
                y: 0,
            });
        }

        gsap.to("#nav-links", {
            y: -100,
            scrollTrigger: {
                trigger: "body",
                scrub: true,
                start: "top 0%",
                end: "+=200"
            }
        })
        mobileLinks.forEach((mobileLink)=>{
            mobileLink.addEventListener('click', ()=>{
                gsap.to('.btn-menu-scroll', { y: -200 })
            })
        })
        $(btnAction).each((index, animateClick) => {
            $(animateClick).on("click", () => {
                if (this.mostraMenu) {

                    gsap.to(container, {
                        x: "110vw",
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
                    btnScroll.classList.remove('active-menu')
                    this.mostraMenu = false;
                     

                } else {
                    btnScroll.classList.add('active-menu')
                    navLinks.classList.add("freezeMenu")
                    this.mostraMenu = true

                    gsap.to(container, {
                        x: 0,
                        duration: 0.3,
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
}
</script>

<style lang="scss">
.freezeMenu {
    transform: none !important;
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
            transform: rotate(45deg) translate(5px, 4.5px);
        }

        &:nth-of-type(2) {
            transform: rotate(-45deg) translate(4px, -4px);
        }
    }
}

.btn-menu-scroll span {
    transition: 0.3s;
}

.btn-menu-mobile {
    position: relative;
    z-index: 999;
    color: var(--branco);

    span {
        font-weight: 400;
    }
}

.mobile-menu-content {
    margin: auto auto !important;
    width: 90%;
    h5{
        padding-top:15px;
    }
}

.container-menu-mobile {
    background-color: var(--preto);
    color: var(--branco);
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 750px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 38px;
    z-index: 10;

    h5 {
        font-size: 15px;
        width: 100%;
        margin: 0 auto;
        text-align: right;
        border-bottom: 1px solid var(--cinza);
        padding-bottom: 10px;
        font-weight: 500;
    }

    .links-menu-mobile {
        display: inline-flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px;
        margin-right: auto;


        a {
            margin-right: auto;
            font-weight: 400;
            font-family: var(--overused);
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
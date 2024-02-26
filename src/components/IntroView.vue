<template>
    <div class="intro-view">
        <h2 class="text-intro"><span>Evahc Studio<sup>©</sup></span></h2>
    </div>
</template>

<script>
import gsap from 'gsap'
export default {

    mounted() {
        const iview = ".intro-view";
        const tl = gsap.timeline();
        gsap.set(iview, { x: 0 })
        gsap.set(iview, { x: 0 })

        tl.to(iview, {
            keyframes: {
                "0%": { x: 0 },
                "100%": { x: "-150vw" }
            },
            ease: "power4",
            delay: 2,
            duration: 2,
        })
        gsap.set(".text-intro", {
           opacity: 0
        })
        gsap.to(".text-intro", {
            opacity:1,
            delay: 0.5,
            ease: "power4.out",
            duration: 1
        })
    }

}
</script>

<style lang="scss">
.intro-view {
    position: fixed;
    width: 100%;
    height: 100%;
    background: var(--preto);
    z-index: 1002;
    color: var(--branco);

    h2 {
        font-family: var(--urbanist) !important;

        font-size: 48px;
        text-align: center;
        font-weight: 500;

        span sup {

            font-size: 25px;
        }


    }

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
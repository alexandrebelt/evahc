<template>
    <div v-if="$route.name === 'Project'" class="routeView">
        <h2 class="text-route" v-html="projectTitle.replace(/-/g, ' ')"></h2>
    </div>
    <div v-else class="routeView">
        <h2 class="text-route">{{ routeName }}</h2>
    </div>
</template>

<script>
import gsap from 'gsap'
export default {
    props: [
        'routeName',
        'projectTitle'
    ],

    mounted() {
        const rview = ".routeView";
        const tl = gsap.timeline();
        gsap.set(rview, { x: "-120vw" })
        gsap.set(".text-route", {
            opacity: 0,
            x: -50,
        })

        gsap.to(rview, {
            x: 0,
            duration: 1,
            ease: "power4.out",
        })

        tl.to(".text-route", {
            x: 0,
            opacity: 1,
            delay: 0.5,
            ease: "linear",
            duration: 1,
        })
        tl.to(".text-route", {
            x: 25,
            opacity: 0,
            ease: "linear",
            duration: 0.5,
            filter: " blur(10px)",
        })
        gsap.to(rview, {
            x: "120vw",
            delay: 2,
            duration: 1,
            filter: " blur(12px)",
            ease: "power4.out"
        })



    }

}
</script>

<style lang="scss">
.routeView {
    position: fixed;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: var(--preto);
    z-index: 1001;
    color: var(--branco);

    h2 {
        font-family: var(--overused) !important;
        font-size: 48px;
        text-align: center;
        font-weight: 500;
        text-transform: lowercase;

        
        &::first-letter {
            text-transform: capitalize !important;
        }
    }

    display: flex;
    align-items: center;
    justify-content: center;
    //padding: 0 30px;
}
</style>
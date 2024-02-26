<template>
    <div v-if="$route.name === 'Project'" class="routeView">
        <h2 class="text-route">{{ projectTitle.replace(/-/g, ' ') }}</h2>
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

        tl.to(rview, {
            keyframes: {
                "0%": { x: "-110vw" },
                "100%": { x: 0 }
            },
            duration: 1.5,
            ease: "power4"
        })
        tl.to(rview, {
            keyframes: {
                "0%": { x: 0 },
                "100%": { x: "-110vw" }
            },
            ease: "power4",
            duration: 1,
        })
        gsap.from(".text-route", {
            x: -100,
        })
        gsap.to(".text-route", {
            x: 25,
            ease: "power4.out",
            duration: 2
        })
    }

}
</script>

<style lang="scss">
.routeView {
    position: fixed;
    width: 100%;
    height: 100%;
    background: var(--preto);
    z-index: 1001;
    color: var(--branco);

    h2 {
        font-family: var(--urbanist) !important;
        text-transform: uppercase;
        font-size: 48px;
        font-weight: 500;

        &:before {
            content: "• "
        }
    }

    display: flex;
    align-items: center;
    padding: 0 30px;
}
</style>
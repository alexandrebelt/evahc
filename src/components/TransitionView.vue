<template>
    <div class="routeView">
        <h2 class="text-route">{{ routeName }}</h2>
    </div>
</template>

<script>
import gsap from 'gsap'
export default {
    props: [
        'routeName'
    ],

    mounted(){
        const rview = ".routeView";
        const tl = gsap.timeline();

        tl.to(rview, {
            keyframes: {
                "0%" : {x:"-100vw"},
                "100%" : {x:"0vw"}
            },
            duration: 1.5,
            ease:"power4"
        })
        tl.to(rview, {
            keyframes: {
                "0%" : {x:"0vw"},
                "100%" : {x:"-120vw"}
            },
            ease: "power1",
            duration: 1,
        })

        gsap.from(".text-route", {
            x:0,
        })
        gsap.to(".text-route", {
            x:100,
            ease:"linear",
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
    background: black;
    z-index: 99999;
    color: var(--branco);
    h2{
        font-family: var(--urbanist) !important;
    }    
    display: flex;
    align-items: center;
    padding:  0 30px;
}
</style>
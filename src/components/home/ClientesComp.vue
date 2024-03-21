<template>
    <section id="clientes">
        <div class="container limit-mid">
            <div class="clientes-title">

                <h2>
                    <img src="imgs/seta-diagonal.png" class="seta-diagonal" />
                    O que andam falando sobre nós
                </h2>
            </div>
        </div>
        <div class="container-clientes clientes-wrapper">
            <div class="depoimentos" ref="depoimentos">
                <div v-for="cliente in clientes" :key="cliente.id" class="box-cliente">
                    <div class="box-cliente-in">
                        <div class="cliente-depoimento">
                            <video class="dep-videos" :poster="cliente.thumb" controls>
                                <source :src="cliente.url">
                            </video>
                        </div>
                        <div class="cliente-nome">
                            <span>{{ cliente.nome }}</span>
                            <span>{{ cliente.empresa }}</span>
                        </div>
                        <div class="cliente-empresa">
                            <a :href="cliente.pro">
                                <span>Ver projeto
                                    <img src="imgs/seta-diagonal.png" class="seta-diagonal"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


export default {

    data() {

        return {
            clientes: [],
            deps: null
        }
    },
    methods: {
        getScrollAmount() {

            let depsWidth = this.deps.scrollWidth;
            return -(depsWidth - window.innerWidth)
        }
    },
    created() {
        axios.get('https://gerenciamento.evahc.com.br/wp-content/uploads/clientes.json')
            .then((response) => {
                this.clientes = response.data.clientes.slice(0, 5)
            })
            .catch((error) => (console.log(error)))
    },
    mounted() {
        let videos = document.querySelectorAll(".dep-videos");

        videos.forEach(video => {
            video.addEventListener('click', () => {
                // Pausar todos os outros vídeos
                videos.forEach(otherVideo => {
                    if (otherVideo !== video) {
                        otherVideo.pause();
                    }
                });
            });
        })

        this.deps = document.querySelector('.depoimentos');
        setTimeout(() => {
            const tween = gsap.to(this.deps, {
                x: this.getScrollAmount(),
                duration: 3,
                ease: "none"
            })

            ScrollTrigger.create({
                trigger: ".clientes-wrapper",
                start: "center center",
                end: () => `+=${this.getScrollAmount() * -1}`,
                pin: true,
                animation: tween,
                scrub: 1,
                invalidateOnRefresh: true
            })
            gsap.to(".clientes-title", {
                scrollTrigger: {
                    trigger: ".clientes-title",
                    start: "top 45%",
                    end: "bottom 70%",
                    pin: true,
                    pinSpacing: false
                }
            })

        }, 1000);
    }
}
</script>

<style lang="scss">
@import 'ClientesComp.scss'
</style>
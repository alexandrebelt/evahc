<template>
    <section id="clientes">
        <div class="container limit">
            <div class="clientes-title">
                <h2>Veja o que dizem nossos clientes</h2>
            </div>
        </div>
        <div class="container-clientes clientes-wrapper">
            <div class="depoimentos" ref="depoimentos">
                <div v-for="cliente in clientes" :key="cliente.id" class="box-cliente">
                    <div class="box-cliente-in">
                        <div class="cliente-depoimento">
                            <p>{{ cliente.depoimento }}</p>
                        </div>
                        <div class="cliente-nome">
                            <span>{{ cliente.nome }}</span>
                        </div>
                        <div class="cliente-empresa">
                            <span>{{ cliente.empresa }}</span>
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
        axios.get('clientes.json')
            .then((response) => {
                this.clientes = response.data.clientes.slice(0, 5)
            })
            .catch((error) => (console.log(error)))
    },
    mounted() {
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
#clientes {
    h2 {
        max-width: 360px;
        margin-bottom: 60px;
    }

    .clientes-title {
        height: 100vh;
    }

    .container-clientes {

        .depoimentos {
            width: fit-content !important;
            display: flex;
            flex-wrap: nowrap;
            gap: 30px;
        }


        .box-cliente {
            flex: 0 0 auto;
            /* Adicionado */
            width: 30vw;
            max-width: 500px;
            padding:20px;

            .box-cliente-in {
                border: 1px solid var(--cinza-claro);
                border-radius: 20px;
                padding: 40px 20px;
                display: flex;
                flex-wrap: wrap;
            }

            .cliente-depoimento {
                color: var(--cinza);
                font-weight: 500;
                flex-basis: 100%;
                margin-bottom: 40px;

                p {
                    line-height: 1.5em !important;
                }
            }

            .cliente-nome {
                flex-basis: 50%;
                font-size: 14px;
            }

            .cliente-empresa {
                flex-basis: 50%;
                color: var(--cinza-quase-claro);
                font-size: 14px;
            }
        }
    }
}</style>
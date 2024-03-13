<template>
    <section id="clientes">
        <div class="container limit-mid">
            <div class="clientes-title">

                <h2>
                    <img src="seta-diagonal.png" class="seta-diagonal" />
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
                            <a href="#">
                                <span>Ver projeto
                                    <img src="seta-diagonal.png" class="seta-diagonal"></span>
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
        axios.get('json/clientes.json')
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
#clientes {
    h2 {
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

            width: 34vw;
            max-width: 600px;
            padding: 20px;

            .box-cliente-in {
                border: 1px solid var(--cinza-claro);
                border-radius: 20px;
                padding: 40px 30px 20px;
                display: flex;
                flex-wrap: wrap;
            }

            .dep-videos {
                aspect-ratio: 16/9;
                object-fit: cover;
            }

            .cliente-depoimento {
                color: var(--cinza);
                font-weight: 500;
                flex-basis: 100%;
                margin-bottom: 10px;

                video {
                    background-color: black;
                    width: 100%;
                }

                p {
                    line-height: 1.5em !important;
                }
            }

            .cliente-nome {
                flex-basis: 50%;
                display: flex;
                flex-direction: column;
                font-size: 14px;

                span:nth-of-type(2) {
                    color: var(--cinza-quase-claro)
                }
            }

            .cliente-empresa {
                flex-basis: 50%;
                text-align: right;
                align-self: center;

                a {
                    font-size: 22px;
                    background-color: var(--cinza-quase-claro);
                    border-radius: 50px;
                    padding: 8px 12px 12px;
                    transition: 0.3s;

                    &:hover {
                        opacity: 0.7;
                    }

                    span {
                        filter: invert(1) brightness(100);
                        margin-right: -5px;

                        img {
                            max-width: 13px;
                            transform: rotate(-90deg);
                            object-fit: contain;
                        }
                    }

                }

            }
        }
    }
}

@media(max-width: 1100px) {
    .box-cliente {
        width: 50vw !important;
    }
}

@media(max-width: 750px) {
    .box-cliente {

        .box-cliente-in {
            flex-direction: column;
        }

        .cliente-empresa a {
            margin: 0 auto !important;
            display: flex;
            width: fit-content;
        }

        .cliente-nome {
            text-align: center;
            margin-bottom: 40px;
        }
    }
}
</style>
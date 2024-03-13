<template>
    <section id="faq">
        <div class="container limit-mid">
            <div class="faq-col col1">
                <h2>
                    <img src="imgs/seta-diagonal.png" class="seta-diagonal" />
                    Dúvidas frequentes
                </h2>
                <p>Não encontrou o que precisava ou possui questões mais complexas? Fale diretamente com a gente pelo
                    <a href="https://wa.me/557998562987" target="_blank">Whatsapp.</a>
                </p>
            </div>
            <div class="faq-col col2">
                <div>
                    <div v-for="(item, index) in itens" :key="item.id" class="faq-row">
                        <div class="faq-wrapper">
                            <div class="faq-pergunta" @click="showFaq(index)">{{ item.pergunta }}</div>
                            <div class="faq-resposta" :class="{ mostraFaq: activeIndex === index }">
                                <p v-html="item.resposta"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { gsap } from 'gsap';
import { scrollTrigger } from 'gsap/all';
gsap.registerPlugin(scrollTrigger)

export default {
    data() {
        return {
            activeIndex: true,
            itens: []
        }
    },
    created() {
        axios.get('json/faq.json')
            .then((response) => (this.itens = response.data.faq))
            .catch((error) => (console.log(error)))
    },
    mounted() {
        const tl = gsap.timeline();


        setTimeout(() => {
            gsap.set(".faq-col.col1 h2, .faq-col.col1 p", {
                opacity: 0,
                x: -100
            })
            gsap.set(".faq-wrapper", {
                opacity: 0,
                x: 100
            })

            tl.to(".faq-col.col1 h2, .faq-col.col1 p", {
                opacity: 1,
                x: 0,
                stagger: 1,
                scrollTrigger: {
                    trigger: "#faq",
                    scrub: 1,
                    start: "top center",
                    end: "center 60%",
                }
            })
            tl.to(".faq-wrapper", {
                opacity: 1,
                x: 0,
                stagger: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: "#faq",
                    scrub: 2.5,
                    start: "top 40%",
                    end: "center 60%",
                }
            })
        }, 1000);
    },
    methods: {
        showFaq(index) {
            if (this.activeIndex === index) {
                this.activeIndex = null;
            } else {
                this.activeIndex = index
            }
        },
    }
}
</script>

<style lang="scss">
#faq .container {
    display: flex;
    display: row;
    gap: 40px;

    .col1 {
        display: flex;
        flex-direction: column;
        align-self: center;

        a {
            color: var(--cinza);
            text-decoration: underline;
        }
    }

    .faq-col {


        flex-basis: 50%;

        &:nth-of-type(1) p {
            max-width: 411px;
        }

        p {
            color: var(--cinza-quase-claro);
        }

        .faq-row {
            border-bottom: 1px solid var(--cinza-claro);

            .faq-pergunta {
                font-size: 22px;
                margin-bottom: 10px;
                margin-top: 20px;
                cursor: pointer;
            }

            .faq-pergunta:before {
                content: '+';
                margin-right: 10px;
            }

            .faq-resposta {
                max-height: 0px;
                overflow: hidden;
                ol{
                    padding-left: 25px;
                }
                margin-bottom: 20px;
                font-weight: 400;
                transition: 0.6s;
            }
        }
    }
}

.mostraFaq {
    max-height: 1000px !important;
}
</style>
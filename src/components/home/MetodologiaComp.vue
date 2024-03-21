<template>
    <section id="metodologia">
        <div class="container limit-mid">
            <div class="metodologia-col1">
                <h2>
                    <img class="seta-diagonal" src="imgs/seta-diagonal.png" />
                    Conheça a C.A.M.I
                </h2>
                <div class="cami-conteudo">
                    <p>Ao conduzirmos a execução e desenvolvimento de diversos projetos, identificamos um padrão de
                        estratégias
                        e técnicas que permeiam nosso processo. Esse padrão resulta em soluções visuais que traduzem
                        marcas
                        de
                        forma inteligente e funcional, agregando valor e alinhando-se às demandas do mercado.</p>
                    <p>Com isso, decidimos criar nossa própria metodologia, a CAMI. Esta sigla representa etapas
                        cruciais
                        que se
                        mostraram indispensáveis ao longo de nossos projetos. Convidamos você a explorar e aprofundar-se
                        em
                        cada
                        uma dessas etapas ao seu lado, descobrindo os detalhes que tornam a CAMI uma abordagem
                        distintiva e
                        eficaz em nosso universo de trabalho.</p>
                </div>
            </div>
            <div class="metodologia-col2">
                <div v-for="met in mets" :key="met.id" class="metodologia-row">
                    <div class="metodologia-itens">{{ met.nome }}</div>
                    <div class="metodologia-descricao">{{ met.descricao }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import gsap from 'gsap'
import scrollTrigger from 'gsap/all'
gsap.registerPlugin(scrollTrigger)

export default {
    data() {
        return {
            mets: []
        }
    },
    created() {
        axios.get('json/metodologia.json')
            .then((response) => (this.mets = response.data.metodologia))
            .catch((error) => console.error(error));
    },
    mounted() {
        const tl = gsap.timeline();
        setTimeout(() => {
            gsap.set(".metodologia-descricao", {
                opacity: 0,
                x: 50
            });
            gsap.set(".metodologia-itens", {
                opacity: 0,
            })
            gsap.set(".metodologia-col1 span", {
                opacity: 1
            })
            gsap.set(".metodologia-col2", {
                opacity: 0
            })
            tl.to("#metodologia", {
                scrollTrigger: {
                    trigger: "#metodologia",
                    pin: true,
                    start: "center center",
                    end: "bottom end",
                    scrub: 1
                }
            })
            tl.to(".metodologia-col2", {
                opacity: 1,
                scrollTrigger: {
                    trigger: "#metodologia",
                    start: "center center",
                    end: "+=100",
                    scrub: 1
                }
            })
            tl.to('.metodologia-descricao, .metodologia-itens', {
                opacity: 1,
                duration: 1,
                x: 0,
                stagger: 1,
                ease: "power1",
                scrollTrigger: {
                    trigger: "#metodologia",
                    scrub: 2,
                    start: "center center",
                    end: "bottom end"
                }
            })
        }, 1000);
    }
}

</script>

<style lang="scss">
#metodologia .container {

    p,
    .metodologia-descricao {
        font-weight: 300 !important;
        font-size: 18px;
    }

    @media(min-width:850px) and (max-width:1100px) {
        column-gap: 100px !important;
    }
}

#metodologia .container,
#metodologia .container .metodologia-row {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

#metodologia .container .metodologia-row {
    display: flex;
    flex-direction: row;
    border-top: 1px solid var(--cinza-claro);
    color: var(--cinza) !important;
    margin-bottom: 50px;
    padding-top: 20px;
}

#metodologia .container .metodologia-col2 {
    display: flex;
    flex-direction: column !important;
}

#metodologia .container {
    column-gap: 200px;
    display: flex;
    height: 100vh;

}

.metodologia-col1 {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-self: center;

    .cami-conteudo {
        display: flex;
        flex-direction: column;
        color: var(--cinza);
        row-gap: 20px;
    }
}

.metodologia-col2 {
    width: 50% !important;
    display: flex;
    flex-direction: column;
    align-self: center;

    .metodologia-itens {
        flex-basis: 30%;
        font-size: 22px !important;
        color: var(--preto)
    }

    .metodologia-descricao {
        flex-basis: 70%;
    }
}


@media(max-width: 849px) {

    #metodologia .container {
        flex-direction: column !important;

        .metodologia-col1,
        .metodologia-col2 {
            width: 100% !important;
        }

        .metodologia-col1 {
            .metodologia-row {
                flex-direction: column !important;
            }

            .cami-conteudo p,
            .metodologia-descricao p {
                line-height: 1.5em !important;
                font-size: 13px !important;
            }
        }
    }


}
</style>
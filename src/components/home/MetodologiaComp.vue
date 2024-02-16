<template>
    <section id="metodologia">
        <div class="container limit">
            <div class="metodologia-col1">
                <span>Processo</span>
            </div>
            <div class="metodologia-col2">
                <h2>
                    Conheça nossa metodologia
                </h2>
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
        axios.get('metodologia.json')
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
                opacity: 0
            })
            tl.to(".metodologia-col1 span", {
                keyframes: {
                    "0%": { opacity: 0 },
                    "30%": { opacity: 1 },
                    "90%": { opacity: 1 },
                    "100%": { opacity: 0 }

                },
                scrollTrigger: {
                    trigger: ".metodologia-col1",
                    scrub: true,
                    pin: true,
                    start: "top center",
                    end: "bottom center+=70",
                },
            })
            tl.to(".metodologia-col2 h2", {
                keyframes: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 }

                },
                scrollTrigger: {
                    trigger: "#metodologia",
                    scrub: true,

                    start: "top 80%",
                    end: "+=200",
                },
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
                    start: "top center",
                    end: "center 40%"
                }
            })
        }, 1000);
    }
}

</script>

<style lang="scss">
#metodologia .container,
#metodologia .container .metodologia-row {
    display: flex;
    flex-direction: row ;
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

.metodologia-col1 {
    width: 15% !important;
    text-transform: uppercase;
    color: var(--cinza-quase-claro);
}

.metodologia-col2 {
    width: 85% !important;

    .metodologia-itens {
        flex-basis: 60%;
        font-size: 22px !important
    }

    .metodologia-descricao {
        flex-basis: 40%;
    }
}
</style>
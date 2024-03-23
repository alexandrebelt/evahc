<template>
    <footer>
        <div id="footer" class="container">
            <div class="footer-contato">
                <h3>
                    Se interessou pelo nosso trabalho?
                </h3>
                <h2>Juntos, temos a capacidade de moldar o mundo dos nossos sonhos.</h2>
                <div class="btn-orcamento-wrapper">
                    <div class="btn-orcamento ">
                        <div class="btn-orcamento-in magnetic">
                            <router-link class="btn-text" to="/orcamento">Solicitar Orçamento</router-link>
                        </div>
                    </div>
                </div>
                <div class="btn-contato">

                    <a class="magnetic-small" href="mailto:contato@evahc.com.br" target="_blank">
                        contato@evahc.com.br
                    </a>
                    <a class="magnetic-small" href="https://wa.me/557998562987" target="_blank">+55 (79) 99856-2987</a>
                </div>
            </div>
            <div class="credits-social">
                <div class="credits-social-col">
                    <p>
                        Aracaju-SE
                    </p>
                    <p>
                        EvahcStudio - Todos os direitos reservados.
                    </p>
                </div>
                <div class="credits-social-col">
                    <p>Redes Sociais</p>
                    <div class="footer-social">
                        <a class="magnetic-small" href="https://www.instagram.com/evahc/" target="_blank">Instagram</a>
                        <a class="magnetic-small" href="https://www.linkedin.com/company/evahc"
                            target="_blank">Linkedin</a>
                        <a class="magnetic-small" href="https://www.behance.net/evahc" target="_blank">Behance</a>
                    </div>
                </div>
            </div>

            <div id="credits">
                <a href="http://portfolio.alexandrebeltramini.com.br/">
                    <div class="credits-wrapper">
                        <h6>
                            Code by AB
                        </h6>
                        <h6>
                            Code by AB
                        </h6>
                    </div>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
import { configGsap, initGsap } from '@/utils/gsapAll'
import { TweenMax, Elastic, Power4 } from 'gsap'

export default {
    data() {
        return {
            gsapFooterActive: false
        }
    },
    mounted() {

        var magnets = document.querySelectorAll('.magnetic')
        var strength = 50
        var textStrength = 30

        magnets.forEach((magnet) => {
            magnet.addEventListener('mousemove', function (event) {
                var magnetButton = event.currentTarget
                var bounding = magnetButton.getBoundingClientRect()
                var magneticText = magnet.querySelector(".btn-text")

                TweenMax.to(magnetButton, 1, {
                    x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
                    y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
                    ease: Power4.easeOut
                })
                if (magneticText) {

                    TweenMax.to(magneticText, 1, {
                        x: (((event.clientX - bounding.left) / magneticText.offsetWidth) - 0.5) * textStrength,
                        y: (((event.clientY - bounding.top) / magneticText.offsetHeight) - 0.5) * textStrength,
                        ease: Power4.easeOut
                    })
                }
            });
            magnet.addEventListener('mouseout', function (event) {
                TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Elastic.easeOut })
                TweenMax.to(magnet.querySelector(".btn-text"), 1, { x: 0, y: 0, ease: Elastic.easeOut })
            });
        });


        if (!this.gsapFooterActive) {
            setTimeout(() => {
                configGsap()
            }, 2000);
            this.gsapFooterActive = true;
        }
        window.removeEventListener('resize', initGsap())
        initGsap()
    }

}
</script>

<style lang="scss">
@import "FooterComp.scss";

#credits {
    cursor: pointer;
    width: fit-content;

    .credits-wrapper {
        height: 15px;
        overflow: hidden;

        h6 {
            display: flex;
            line-height: 1.4em
        }
    }
}
</style>
<template>
    <footer>
        <div id="footer" class="container">
            <div class="footer-contato">
                <h2>Vamos fazer um projeto
                    extraordinário juntos?</h2>
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
                        <a class="magnetic-small" href="#" target="_blank">+55 79 9 9999-9999</a> <!--ADICIONAR DEPOIS-->
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
                        <a class="magnetic-small" href="https://www.linkedin.com/company/evahc" target="_blank">Linkedin</a>
                        <a class="magnetic-small" href="https://www.behance.net/evahc" target="_blank">Behance</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import { TweenMax, Elastic, Power4 } from 'gsap'

export default {

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



    }
}
</script>

<style lang="scss">
body {
    overflow-y: hidden;
}

.btn-orcamento-in:hover {
    background-color: var(--cinza) !important;
    color: var(--cinza-claro) !important;
}

footer {
    background: var(--preto);
    color: var(--branco);
    position: relative;
    z-index: 9997;


    #footer {
        padding: 100px 30px 30px;
        max-width: var(--container-width);


        .footer-contato {
            max-width: 1230px;
            margin: 0 auto;
            margin-bottom: 100px;

            .btn-orcamento-wrapper {
                height: 0;
                border-top: 1px solid var(--cinza);
                position: relative;
                margin: 60px 0;
            }

            .btn-orcamento {


                .btn-orcamento-in {
                    transition: background-color 0.2s;
                    position: absolute;
                    right: 10%;
                    aspect-ratio: 1;

                    background: var(--branco);
                    display: flex;
                    align-items: center;
                    top: -103px;
                    border-radius: 100px;
                    color: var(--preto);

                    a {
                        max-width: 100px;
                        text-align: center;
                        padding: 75px 50px;
                    }
                }
            }



            h2 {
                max-width: 800px;
                font-family: var(--urbanist) !important;
                font-weight: 600;
            }

            .btn-contato {
                display: flex;
                gap: 10px;

                a {
                    border: 1px solid var(--cinza);
                    border-radius: 50px;
                    padding: 20px 40px;
                }

            }
        }

        .credits-social {
            display: flex;
            flex-direction: row;
            gap: 40px;
            justify-content: space-between;

            .footer-social {
                display: flex;
                flex-direction: row;
                gap: 60px;

                a {
                    line-height: 2em;
                }
            }

            .credits-social-col p:nth-of-type(1) {
                color: var(--cinza);
            }
        }
    }
}
</style>
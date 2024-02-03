<template>
    <footer>
        <div id="footer" class="container">
            <div class="footer-contato">
                <h2>Vamos fazer um projeto
                    extraordinário juntos?</h2>
                <div class="btn-orcamento">
                    <div class="btn-orcamento-in">
                        <router-link to="/orcamento">Solicitar Orçamento</router-link>
                    </div>
                </div>
                <div class="btn-contato">
                    <a href="mailto:contato@evahc.com.br" target="_blank">
                        contato@evahc.com.br
                    </a>
                    <a href="#" target="=_blank">+55 79 9 9999-9999</a> <!--ADICIONAR DEPOIS-->
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
                        <a href="https://www.instagram.com/evahc/" target="_blank">Instagram</a>
                        <a href="https://www.linkedin.com/company/evahc" target="_blank">Linkedin</a>
                        <a href="https://www.behance.net/evahc" target="_blank">Behance</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import gsap from 'gsap'
import {scrollTrigger} from 'gsap/all'
import {configGsap} from '/src/utils/gsapAll.js'
export default {

}
</script>

<style lang="scss">
body{
    overflow-y: hidden;
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
            

            .btn-orcamento {
                height: 0;
                border-top: 1px solid var(--cinza);
                position: relative;
                margin: 60px 0;

                .btn-orcamento-in {
                    position: absolute;
                    right: 10%;
                    aspect-ratio: 1;

                    background: var(--branco);
                    display: flex;
                    align-items: center;
                    top: -103px !important;
                    border-radius: 100px;
                    color: var(--preto);

                    a {
                        max-width: 100px;
                        text-align: center;
                        padding: 50px;
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
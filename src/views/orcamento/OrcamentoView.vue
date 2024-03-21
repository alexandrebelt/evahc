<template>
    <div v-if="isFormSended" class="container limit-mid agradecimento">
        <h1>Agradecemos o contato, em breve retornaremos!</h1>
    </div>
    <section v-else id="orcamento" class="container limit-mid">
        <div class="blank-space"></div>
        <div class="title-orcamento">
            <h2>
                <img src="imgs/seta-diagonal.png" class="seta-diagonal" />
                Vamos dar vida as suas ideias!
            </h2>
            <h5>Preencha os campos abaixo para que possamos conhecer melhor você e seu negócio!</h5>
        </div>
        <form ref="form" id="form-orcamento" @submit.prevent="sendEmail">
            <input name="nome" required type="text" placeholder="Seu nome e sobrenome *" />
            <input name="email" required type="email" placeholder="Seu e-mail *" />
            <input name="tel" required class="numeric" type="tel" placeholder="Seu WhatsApp com DDD? *" />
            <input name="empresa" type="text" placeholder="Nome da empresa (Se houver)" />
            <select required id="inpi" name="inpi">
                <option value="" selected disabled hidden> Você sabe se o nome da empresa está disponível para registro
                    no
                    INPI dentro do seu segmento? *</option>
                <option value="Não possui naming">Ainda não possui naming irei precisar deste serviço.</option>
                <option value="Marca já registrada">A marca já está registrada.</option>
                <option value="Em processo de registro">Estou em processo de registro.</option>
                <option value="Disponivel mas não registrado">Tenho certeza da disponibilidade, mas ainda não registrei.
                </option>
                <option value="Não tenho certeza da disponibilidade">Não tenho certeza da disponibilidade.</option>
                <option value="Não sei nada sobre marcas">Não sei nada sobre registro de marcas.</option>
            </select>
            <select required id="momento-da-empresa" name="momento-da-empresa">
                <option value="" selected disabled hidden>Em qual momento a empresa se encontra hoje? *</option>
                <option value="Começando do zero">Estou começando do zero.</option>
                <option value="Em expansão">Em fase de expansão, precisando de uma estruturação de marca e comunicação
                    visual assertiva para consolidar a empresa.</option>
                <option value="Consolidada">A empresa já é consolidada, mas está em fase de mudanças para se adequar ao
                    mercado de trabalho atual.</option>
            </select>
            <select required id="orcamento-de-projeto" name="orcamento-de-projeto">
                <option value="" selected disabled hidden>Qual é a sua estimativa de investimento para este projeto? *
                </option>
                <option value="5 mil a 6 mil">5 mil a 6 mil</option>
                <option value="7 mil a 8 mil">7 mil a 8 mil</option>
                <option value="9 mil a 10 mil">9 mil a 10 mil</option>
                <option value="A partir de 10 mil">A partir de 10 mil</option>
            </select>
            <select required id="porte-da-empresa" name="porte-da-empresa">
                <option value="" selected disabled hidden>Qual o porte da empresa? *</option>
                <option value="MEI"> MEI (Micro Empreendedor Individual) </option>
                <option value="2 a 5 funcionários">2 a 5 funcionários</option>
                <option value="5 - 15 funcionários">5 - 15 funcionários</option>
                <option value="15 - 50 funcionários">15 - 50 funcionários</option>
                <option value="50 - 100 funcionários">50 - 100 funcionários</option>
                <option value="100+ funcionários">100+ funcionários</option>
            </select>
            <textarea required name="detalhes-empresa" size="small" @input="autoResize"
                placeholder="Conte-nos mais detalhes sobre sua empresa *"></textarea>
            <input name="social" type="text"
                placeholder="Caso sua empresa já possua site e/ou redes sociais, nos informe aqui , por gentileza" />
            <select required id="urgencia-para-inicio" name="urgencia-para-inicio">
                <option value="" selected disabled hidden>Qual o nível de urgência para o ínicio do projeto? *</option>
                <option value="Pouca">Pouca</option>
                <option value="Razoável">Razoável</option>
                <option value="Imediata">Imediata</option>
            </select>
            <select required id="onde-nos-encontrou" name="onde-nos-encontrou">
                <option value="" selected disabled hidden>Onde você nos encontrou? *</option>
                <option value="Google">Google</option>
                <option value="Instagram">Instagram</option>
                <option value="Behance">Behance</option>
                <option value="Indicação">Indicação</option>
            </select>
            <textarea name="algo-mais" size="small" @input="autoResize"
                placeholder="Deseja acrescentar mais alguma informação? Fique à vontade!"></textarea>
            <button class="magnetic" type="submit">
                <span class="btn-text">
                    Solicitar
                </span>
            </button>
        </form>

    </section>
</template>

<script>
import $ from 'jquery'
import { defineComponent } from 'vue';
import { initMagnets } from '@/utils/magneticElements';
import gsap from 'gsap';
import emailjs from "@emailjs/browser"

export default defineComponent({
    data() {
        return {
            isFormSended: false
        }
    },
    methods: {
        autoResize(event) {

            event.target.style.height = '35px';
            event.target.style.height = event.target.scrollHeight + 'px'
        },
        sendEmail() {
            emailjs
                .sendForm('service_dotv4a8', 'template_jxaq8hl', this.$refs.form, {
                    publicKey: '9eMtvo7WNII7HiCa1',
                })
                .then(
                    () => {
                        if (!this.isFormSended) {
                            window.scrollTo(0, 0);

                            setTimeout(() => {
                                setTimeout(() => {
                                    this.isFormSended = true

                                }, 500);
                                const formulario = document.querySelector("#orcamento")
                                gsap.from(formulario, {
                                    opacity: 1,
                                    height: "100vh"
                                })
                                gsap.to(formulario, {
                                    opacity: 0,
                                    height: "0px"
                                })
                            }, 1500);
                        }
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    },
                );
        }
    },
    mounted() {

        setTimeout(() => {
            initMagnets()
        }, 500)
        document.querySelector('.numeric').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    },
    beforeUnmount() {
        window.removeEventListener('load', initMagnets)
    }
})
</script>

<style lang="scss">
@import 'OrcamentoView.scss';
</style>
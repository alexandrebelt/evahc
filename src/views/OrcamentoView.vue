<template>
    <section id="orcamento" class="container limit">
        <h2>
            Vamos fazer um projeto extraordinário juntos?
        </h2>
        <h5>Preencha os campos abaixo para que possamos conhecer melhor você e seu negocio!</h5>
        <form id="form-orcamento" :onSubmit="submitOrcamento">
            <InputComponent isRequired="true" inputType="text" pHolder="Seu nome e sobrenome *" />
            <InputComponent isRequired="true" inputType="email" pHolder="Seu e-mail *" />
            <InputComponent class="numeric" isRequired="true" inputType="tel" pHolder="Seu WhatsApp com DDD? " />
            <InputComponent isRequired="false" inputType="text" pHolder="Nome da empresa (Se houver)" />
            <select required id="inpi" name="inpi">
                <option value="" selected disabled hidden> Você sabe se o nome da empresa está disponível para registro no
                    INPI dentro do seu segmento?</option>
                <option value="Não possui naming">Ainda não possui naming irei precisar deste serviço.</option>
                <option value="Marca já registrada">A marca já está registrada.</option>
                <option value="Em processo de registro">Estou em processo de registro.</option>
                <option value="Disponivel mas não registrado">Tenho certeza da disponibilidade, mas ainda não registrei.
                </option>
                <option value="Não tenho certeza da disponibilidade">Não tenho certeza da disponibilidade.</option>
                <option value="Não sei nada sobre marcas">Não sei nada sobre registro de marcas.</option>
            </select>
            <select id="momento-da-empresa" name="momento-da-empresa">
                <option value="" selected disabled hidden>Em qual momento a empresa se encontra hoje?</option>
                <option value="Começando do zero">Estou começando do zero.</option>
                <option value="Em expansão">Em fase de expansão, precisando de uma estruturação de marca e comunicação visual assertiva para consolidar a empresa.</option>
                <option value="Consolidada">A empresa já é consolidada, mas está em fase de mudanças para se adequar ao mercado de trabalho atual.</option>
            </select>
            <select id="porte-da-empresa" name="porte-da-empresa">
                <option value="" selected disabled hidden>Qual o porte da empresa?</option>
                <option value="MEI">  MEI (Micro Empreendedor Individual) </option>
                <option value="2 a 5 funcionários">2 a 5 funcionários</option>
                <option value="5 - 15 funcionários">5 - 15 funcionários</option>
                <option value="15 - 50 funcionários">15 - 50 funcionários</option>
                <option value="50 - 100 funcionários">50 - 100 funcionários</option>
                <option value="100+ funcionários">100+ funcionários</option>
            </select>
            <TextareaComp isRequired="true" pHolder="Conte-nos mais detalhes sobre sua empresa" />
            <InputComponent isRequired="false" inputType="text"
                pHolder="Caso sua empresa já possua site e/ou redes sociais, nos informe aqui , por gentileza" />
                <select id="urgencia-para-inicio" name="urgencia-para-inicio">
                    <option value="" selected disabled hidden>Qual o nível de urgência para o ínicio do projeto?</option>
                    <option value="Pouca">Pouca</option>
                    <option value="Razoável">Razoável</option>
                    <option value="Imediata">Imediata</option>
                </select>
                <select>
                    <option value="" selected disabled hidden>Onde você nos encontrou?</option>
                    <option value="Google">Google</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Behance">Behance</option>
                    <option value="Indicação">Indicação</option>
                </select>
            <TextareaComp isRequired="false" pHolder="Deseja acrescentar mais alguma informação? Fique à vontade!" />
            <button class="magnetic-small" type="submit">
                <span>
                    Enviar
                </span>
            </button>
        </form>

    </section>
</template>

<script>
import $ from 'jquery'
import { defineComponent } from 'vue';
import InputComponent from '../components/orcamento/inputComp.vue'
import TextareaComp from '../components/orcamento/textAreaComp.vue'
import { initMagnets } from '@/utils/magneticElements';

export default defineComponent({
    components: {
        InputComponent,
        TextareaComp
    },
    methods: {
        submitOrcamento(event) {
            event.preventDefault()
            console.log('teste')

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
#orcamento {
    h2 {
        max-width: 670px;
        margin-bottom: 40px;
    }

    h5 {
        margin-bottom: 20px;
        font-size: 15px !important;
    }
}

#form-orcamento {
    display: flex;
    flex-direction: column;
    max-width: 800px;

    input,
    textarea,
    option,
    select {
        background-color: var(--branco);
        resize: none;
        max-height: 300px;
        border: 0;
        border-bottom: 1px solid var(--cinza-claro);
        color: var(--cinza) !important;
        font-family: var(--urbanism);
        font-size: 18px;
        margin-bottom: 30px;
        padding-bottom: 10px;

        &::placeholder {
            opacity: 0.5 !important;

        }

        &:focus-visible {
            outline: 0 !important;
        }
    }

    button {
        background: var(--preto);
        border: 0;
        display: flex;
        width: 100px;
        height: 100px;
        color: var(--branco);
        font-family: VAR(--urbanist);
        font-size: 24px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        aspect-ratio: 1 !important;
        cursor: pointer
    }
}
</style>
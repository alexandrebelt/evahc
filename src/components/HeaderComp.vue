<template>
    <nav id="nav">
        <div id="nav-links" :class="{ 'router-color': isHome }">
            <div class="nav-col">
                <router-link to="/"><span>Evahc Studio<sup>©</sup></span></router-link>
            </div>
            <div class="nav-col">
                <router-link to="/portfolio">Portfólio</router-link>
                <router-link to="/sobre-nos">Sobre Nós</router-link>
                <router-link to="/orcamento">Orçamento</router-link>
            </div>
        </div>
    </nav>

</template>

<script>
export default {
    data() {
        return {
            isHome: false,
        }
    },
    watch: {
        $route(to, from) {
            this.isHome = to.path !== '/'
        }
    }
}
</script>

<style>
.router-color {
    color: var(--preto) !important;
}


nav {
    span sup {

        font-size: 14px;
    }

    z-index: 9999;
    position: absolute;
    width: 100%;
    font-family: "Overused";

    .nav-col:nth-of-type(2) a {
        font-weight: 300;
    }

    #nav-links {
        padding: 30px;
        color: var(--branco);
        max-width: var(--container-width);
        margin: 0 auto;

    }

    span {
        font-size: 24.75px !important;
    }

    .nav-col {
        display: flex;
        flex-direction: row;
        gap: 50px;
    }

    a {
        font-weight: bold;
        color: inherit;
        text-decoration: none;
        align-self: center;

    }
}

#nav-links {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between;
}
</style>
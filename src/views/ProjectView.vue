<template>
    <div v-if="proj">
        <section class="post-individual">
            <div class="container limit">
                <div class="post-cliente">
                    <span>Cliente</span>
                    <h3>{{ proj.title.rendered }}</h3>
                </div>
                <img class="individual-project-cover"
                    v-if="proj['_embedded'] && proj['_embedded']['wp:featuredmedia'] && proj['_embedded']['wp:featuredmedia'][0].source_url"
                    :src="proj['_embedded']['wp:featuredmedia'][0].source_url" :alt="proj.title.rendered + '_thumb'">
                <p v-html="proj.content.rendered"></p>
            </div>
        </section>

    </div>
    <div v-else>
        <section>
            <div class="container limit">
                <h1>Projeto não encontrado</h1>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['projectId'],
    data() {
        return {
            proj: null,
        };
    },
    methods: {

    },
    mounted() {
        axios.get(`https://evahc.com.br/wp-json/wp/v2/posts/${this.projectId}?_embed`)
            .then((response) => {
                this.proj = response.data
            })
            .catch((error) => (console.log(error)))

    }
};
</script>

<style lang="scss">
.post-individual {

    .wp-block-columns {
        margin: 80px 0;

        &.is-layout-flex {
            display: flex;
            gap: 40px;
            justify-content: space-between;

            .wp-block-column-is-layout-flow {
                max-width: 600px;
            }
        }

    }

    .post-cliente {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 12px !important;
        font-family: var(--overused);
        padding: 20px;

        span {
            font-weight: 500;
            text-transform: uppercase;
        }

        h3 {}

    }

    h2 {
        font-size: 42px !important;
        margin-bottom: 40px;
    }

    img {
        width: 100%;
        object-fit: cover;
        height: auto;
        border-radius: 20px;
    }
}
</style>
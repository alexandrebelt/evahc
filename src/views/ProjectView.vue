<template>
    
    <div v-if="proj">
        <section class="post-individual">
            <div class="container limit">
                <div class="post-top">
                    <div class="post-cliente post-top-col">
                        <span>Cliente</span>
                        <h3>{{ proj.title.rendered }}</h3>
                    </div>
                    <div class="post-categories post-top-col">
                        <h3 v-for="categoryId in proj.categories" :key="categoryId">
                            {{ getCategoryName(categoryId) }}
                        </h3>
                    </div>
                </div>
                <img class="individual-project-cover"
                    v-if="proj['_embedded'] && proj['_embedded']['wp:featuredmedia'] && proj['_embedded']['wp:featuredmedia'][0].source_url"
                    :src="proj['_embedded']['wp:featuredmedia'][0].source_url" :alt="proj.title.rendered + '_thumb'">
                <p class="post-content" v-html="proj.content.rendered"></p>
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
    props: ['projectId', 'projectName'],
    data() {
        return {
            proj: null,
            categories: {}
        };
    },
    methods: {
        loadCategories() {
            axios.get('https://evahc.com.br/wp-json/wp/v2/categories')
                .then((response) => {
                    response.data.forEach((category) => {
                        this.categories[category.id] = category.name;
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getCategoryName(categoryId) {
            return this.categories[categoryId];
        },
    },
    mounted() {
        axios.get(`https://evahc.com.br/wp-json/wp/v2/posts/${this.projectId}?_embed`)
            .then((response) => {
                this.proj = response.data
                this.loadCategories()
            })
            .catch((error) => (console.log(error)))

    }
};
</script>

<style lang="scss">
.post-individual {

    .post-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .post-top-col {

            span,
            h3 {
                font-size: 12px;
            }

        }

        .post-top-col {
            &:nth-of-type(1) {
                h3 {
                    font-weight: 600;
                    text-transform: uppercase;
                }

            }
        }

        .post-categories {
            display: flex;
            flex-direction: row;
            gap: 10px;
            padding: 20px;
            top: 10px !important;
            right: 10px !important;


            h3 {
                background: rgba(0, 0, 0, 0.4);
                color: var(--branco);
                font-weight: 500;
                padding: 5px 10px;
                border-radius: 20px;
            }
        }
    }

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
}</style>
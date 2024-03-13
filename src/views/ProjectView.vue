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
                <div class="proj-content">
                    <div class="wp-block-column data-proj">
                        <h2>{{ proj.title.rendered }}</h2>
                        <em>"A matéria-prima da sua imaginação"
                        </em>
                        <p>{{ loadDate(proj.date) }}</p>
                    </div>
                    <p class="post-content" v-html="proj.content.rendered"></p>
                </div>
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
import gsap from 'gsap';
export default {
    props: ['projectId', 'projectName'],
    data() {
        return {
            proj: null,
            categories: {}
        };
    },
    methods: {
        loadDate(date) {
            const wordpressDate = date;
            const data = new Date(wordpressDate);

            const mes = data.toLocaleString('default', { month: "long" });
            const ano = data.getFullYear();
            return `${mes}` + "/" + `${ano}`;
        },
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
    created() {
        axios.get(`https://evahc.com.br/wp-json/wp/v2/posts?slug=${this.projectName}&_embed`)
            .then((response) => {
                this.proj = response.data[0]
                this.loadCategories()
            }).then(() => {
                let dataProj = document.querySelector(".data-proj");
                let dataPai = document.querySelector(".wp-block-columns");
                let datafirstChild = dataPai.firstChild;


                let wpCol = document.querySelector(".wp-block-column");

                dataPai.insertBefore(dataProj, datafirstChild);

                gsap.set(".wp-block-column", {
                    opacity: 0,
                    x: 100
                })
                gsap.to(".wp-block-column", {
                    opacity: 1,
                    x: 0,
                    stagger: {
                        each: 0.2,
                    },
                    scrollTrigger: {
                        trigger: dataPai,
                        scrub: 2,
                        start: "70% bottom",
                        end: "center center",
                    }
                })
            })
            .catch((error) => (console.log(error)))

    },
};
</script>

<style lang="scss">
.post-individual {

    .proj-content {

        h4 {
            font-size: 21px !important;
            margin-bottom: 10px;
            font-weight: 400;
            color: var(--preto)
        }

        .wp-block-column-is-layout-flow p {
            color: var(--cinza)
        }
    }

    .post-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .post-top-col {
            span{
                text-transform: uppercase;
                color:var(--cinza)
            }
            span,
            h3 {
                font-size: 13px;
            }

        }

        .post-top-col {
            &:nth-of-type(1) {
                h3 {
                    font-weight: 500;
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

        .data-proj {
            order: 0;
        }

        .wp-block-column-is-layout-flow {
            order: 1
        }

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
        }


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

.data-proj {
    width: 30%;

    h2 {
        text-transform: lowercase;
        margin-bottom: 20px;

        &:first-letter {
            text-transform: uppercase;
        }
    }

    em {
        font-size: 23px;
        font-weight: 300;

        &:before,
        &:after {
            content: '"';
        }
    }

    p {
        text-transform: capitalize;
        margin-top: 40px;
        font-weight: 300;
        font-size: 23px;
        color: var(--cinza-quase-claro);
    }
}
</style>
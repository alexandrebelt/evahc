<template>
    <div v-if="proj">
        <section class="post-individual">
            <div class="container limit">
                <div class="post-top">
                    <div class="post-cliente post-top-col">
                        <span>Cliente</span>
                        <h3 v-html="proj.title.rendered"></h3>
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
                        <h2 v-html="proj.title.rendered"></h2>
                        <em v-html="proj.excerpt.rendered">
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
                <h1>...</h1>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import gsap from 'gsap';
import { mapMutations } from 'vuex';
export default {
    props: ['projectSlug', 'projectName'],
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
            axios.get('https://gerenciamento.evahc.com.br/wp-json/wp/v2/categories')
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
        axios.get(`https://gerenciamento.evahc.com.br/wp-json/wp/v2/posts?slug=${this.projectSlug}&_embed`)
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
                        start: "50% bottom",
                        end: "center center",
                    }
                })
            })
            .catch((error) => (console.log(error)))

    },
};
</script>

<style lang="scss">
@import 'ProjectView.scss';
</style>
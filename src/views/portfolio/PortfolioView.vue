<template>
    <section id="portfolio" class="container limit">
        <div class="blank-space"></div>

        <ul class="portfolio-projects">
            <li class="projects-individual proj-ind" v-for="proj in projs" :key="proj.id">
                <router-link :to="{
                name: 'Project', params: {
                    projectId: proj.id,
                    projectName: proj.slug
                }
            }">
                    <div class="project-tag">
                        <h3>{{ proj.title.rendered }}</h3>
                        <h3 v-for="tagId in proj.tags" :key="tagId">
                            {{ getTagName(tagId) }}</h3>
                    </div>
                    <img v-if="proj['_embedded'] && proj['_embedded']['wp:featuredmedia'] && proj['_embedded']['wp:featuredmedia'][0].source_url"
                        :src="proj['_embedded']['wp:featuredmedia'][0].source_url"
                        :alt="proj.title.rendered + '_thumb'">
                    <div v-if="proj.categories.length > 0">
                        <ul class="portfolio-categories">
                            <li class="portfolio-category" v-for="categoryId in proj.categories" :key="categoryId">
                                {{ getCategoryName(categoryId) }}
                            </li>
                        </ul>
                    </div>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script lang="js">
import axios from 'axios';
import gsap from 'gsap';
import scrollTrigger from 'gsap/all'
import { defineComponent } from 'vue';
gsap.registerPlugin(scrollTrigger);

export default defineComponent({

    data() {
        return {
            projs: [],
            categories: {},
            tags: {},
            portLoaded: false
        }
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
        loadTags() {
            axios.get('https://evahc.com.br/wp-json/wp/v2/tags')
                .then((response) => {
                    response.data.forEach((tag) => {
                        this.tags[tag.id] = tag.name;
                    })
                })
        },
        getTagName(tagId) {
            return this.tags[tagId];
        },
        async carregaPortfolio() {
            try {
                axios.get('https://evahc.com.br/wp-json/wp/v2/posts?_embed')
                    .then((response) => {
                        this.projs = response.data
                        this.loadCategories();
                        this.loadTags();
                    })
                    .catch((error) => console.log(error))
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted() {

        if (!this.portLoaded) {
            this.carregaPortfolio()
        }
        setTimeout(() => {
            gsap.set(".proj-ind", {
                opacity: 0,
                scale: 0
            })
            gsap.to(".proj-ind", {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power4"
            })
        }, 1000);

    }
})
</script>

<style lang="scss">
@import 'PortfolioView.scss';
</style>
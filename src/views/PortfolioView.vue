<template>
    <section id="portfolio" class="container limit">

        <ul class="portfolio-projects">
            <li class="projects-individual" v-for="proj in projs" :key="proj.id">
                <router-link :to="{
                    name: 'Project', params: {
                        projectName: proj.title.rendered.toLowerCase().replace(/\s+/g, '-'),
                        projectId: proj.id
                    }
                }">
                    <div class="project-tag">
                        <h3>{{ proj.title.rendered }}</h3>
                        <h3 v-for="tagId in proj.tags" :key="tagId">
                            {{ getTagName(tagId) }}</h3>
                    </div>
                    <img v-if="proj['_embedded'] && proj['_embedded']['wp:featuredmedia'] && proj['_embedded']['wp:featuredmedia'][0].source_url"
                        :src="proj['_embedded']['wp:featuredmedia'][0].source_url" :alt="proj.title.rendered + '_thumb'">
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
            tags: {}
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
        gsap.set(".projects-individual", {
            opacity: 0,
            scale: 0
        })
        this.carregaPortfolio().then(() => {
            gsap.from(".projects-individual", {
                opacity: 0,
                scale: 0
            })
            gsap.to(".projects-individual", {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power4"
            })
        });
    }
})
</script>
<style lang="scss">
#portfolio li {
    list-style: none;
}

#portfolio .portfolio-projects {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    row-gap: 20px;
    justify-content: space-between;
}

#portfolio .projects-individual {
    aspect-ratio: 3/2;
    flex-basis: calc(50% - 10px);
    position: relative;
    height: 100%;

    .project-tag {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 12px;
        display: flex;
        flex-direction: row;
        gap: 10px;

    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 20px;
    }

    .portfolio-categories {
        display: flex;
        flex-direction: row;
        gap: 10px;
        position: absolute;
        top: 10px;
        right: 10px !important;
        font-size: 13px;

        li {
            background: rgba(0, 0, 0, 0.4);
            color: var(--branco);
            padding: 5px 10px;
            border-radius: 20px;
        }
    }
}
</style>
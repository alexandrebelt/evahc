<template>
    <section id="home-projs">
        <div class="projects container limit">
            <div class="project-cover" v-for="proj in projs" :key="proj.id">
                <router-link
                    :to="{ name: 'Project', params: { projectName: proj.title.rendered.toLowerCase().replace(/\s+/g, '-'), projectId: proj.id } }">
                    <div class="project-tags">
                        <h3>{{ proj.title.rendered }}</h3>
                        <h3 v-for="tagId in proj.tags" :key="tagId">{{ getTagName(tagId) }}</h3>
                    </div>
                    <div class="project-category">
                        <ul>
                            <li v-for="categoryId in proj.categories" :key="categoryId">
                                {{ getCategoryName(categoryId) }}
                            </li>
                        </ul>
                    </div>
                    <img v-if="proj['_embedded'] && proj['_embedded']['wp:featuredmedia'] && proj['_embedded']['wp:featuredmedia'][0].source_url"
                        :src="proj['_embedded']['wp:featuredmedia'][0].source_url" :alt="proj.title.rendered + '_thumb'">
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import { configGsap, initGsap } from '@/utils/gsapAll'
import axios from 'axios'
export default {
    data() {
        return {
            projs: [],
            tags: {},
            categories: {},
            dadosCarregados: false,
        }

    },
    methods: {
        loadTags() {
            return axios.get('https://evahc.com.br/wp-json/wp/v2/tags')
                .then((response) => {
                    response.data.forEach((tag) => {
                        this.tags[tag.id] = tag.name
                    })
                })
        },
        getTagName(tagId) {
            return this.tags[tagId]
        },

        loadCategories() {
            return axios.get('https://evahc.com.br/wp-json/wp/v2/categories')
                .then((response) => {
                    response.data.forEach((category) => {
                        this.categories[category.id] = category.name;
                    })
                })
        },
        getCategoryName(categoryId) {
            return this.categories[categoryId]
        },
        async fetchProjsData() {
            try {
                const response = await axios.get('https://evahc.com.br/wp-json/wp/v2/posts?_embed')

                this.projs = response.data.slice(0, 3);
                await this.loadTags();
                await this.loadCategories();
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted() {
        this.fetchProjsData().then(()=>initGsap())
    }
}
</script>

<style lang="scss">
#home-projs {
    position: relative;
    height: 400vh !important;
    background-color: var(--branco);
    z-index: 999;
}

.projects {
    position: relative;
    height: 300vh
}

.project-cover {
    border-radius: 20px;
    margin: 0 auto;
    height: 67vh;
    margin-bottom: 33vh;
    width: 100%;
    aspect-ratio: 10/5;
    max-height: 70vh;
    position: relative;

    img {

        width: 100% !important;
    }

    .project-tags {
        position: absolute;
        top: 20px;
    }

    .project-tags {
        position: absolute;
        top: 10px !important;
        left: 10px !important;
        font-size: 12px;
        display: flex;
        flex-direction: row;
        gap: 10px;

        :nth-of-type(2) {
            font-weight: 500;
        }

    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 20px;
    }

    .project-category ul {
        display: flex;
        flex-direction: row;
        gap: 10px;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;

        li {
            background: rgba(0, 0, 0, 0.4);
            color: var(--branco);
            font-family: var(--overused);
            list-style: none;
            padding: 5px 10px;
            border-radius: 20px;
        }
    }
}
</style>
<template>
    <section id="home-projs">
        <div class="projects container limit">
            <div class="project-cover" v-for="proj in projs" :key="proj.id">
                <router-link :to="{
                name: 'Project', params: {
                    projectSlug: proj.slug,
                    projectName: proj.title.rendered 
                }
            }" @click="$store.commit('setProjectName', proj.title.rendered)">
                    <div class="project-tags">
                        <h3 v-html="proj.title.rendered"></h3>
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
                        :src="proj['_embedded']['wp:featuredmedia'][0].source_url"
                        :alt="proj.title.rendered + '_thumb'">
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
            projsLoaded: false
        }

    },
    methods: {

        loadTags() {
            return axios.get('https://gerenciamento.evahc.com.br/wp-json/wp/v2/tags')
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
            return axios.get('https://gerenciamento.evahc.com.br/wp-json/wp/v2/categories')
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
                const response = await axios.get('https://gerenciamento.evahc.com.br/wp-json/wp/v2/posts?_embed')
                this.projs = response.data.slice(0, 3);
                await this.loadTags();
                await this.loadCategories();
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted() {
        if (!this.projsLoaded) {
            this.fetchProjsData().then(() => initGsap())
            this.projsLoaded = true
        }
    }
}
</script>

<style lang="scss">
#home-projs {
    position: relative;
    background-color: var(--branco);
    z-index: 999;
}

.projects {
    position: relative;
    height: 350vh;

    .project-cover {
        border-radius: 100px;
        position: relative;
        height: auto;
        max-height: 95vh;

        .project-tags {
            position: absolute;
            top: 20px;
            filter: invert(1);
            mix-blend-mode: exclusion;
        }

        .project-tags {
            position: absolute;
            top: 30px !important;
            left: 30px !important;
            font-size: 13px;
            display: flex;
            flex-direction: row;
            gap: 30px;
            filter: invert(1);
            mix-blend-mode: exclusion;

            h3 {
                text-transform: lowercase;

                &:first-letter {
                    text-transform: uppercase;
                }
            }

            :nth-of-type(1) {
                font-weight: 600;
            }

            :nth-of-type(2) {
                font-weight: 400;
            }


        }

        img {
            width: 100%;
            aspect-ratio: 16/9;
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
            top: 30px;
            right: 30px;
            font-size: 12px;

            li {
                background: rgba(150, 150, 150, .7);
                color: var(--branco);
                font-family: var(--overused);
                list-style: none;
                padding: 5px 10px;
                border-radius: 20px;
            }
        }
    }
}
</style>
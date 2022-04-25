<template>
    <v-card :class="$vuetify.breakpoint.smAndDown ? '' : 'px-10'">
        <v-card-title>
            {{ article.title }}
        </v-card-title>

        <v-card-subtitle>
            <div>
                {{ article.createdAt }}
            </div>

            <div>
                タグ:
                <span v-for="tag in article.tags" :key="tag">
                    <nuxt-link :to="`/tag/${tag}`" class="favorite-color">
                        {{ tag }}
                    </nuxt-link>
                </span>
            </div>
        </v-card-subtitle>

        <v-divider />

        <surround-pagination />

        <v-card-text>
            <article>
                <nuxt-content :document="article" />
            </article>
        </v-card-text>

        <surround-pagination />
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import surroundPagination from '~/components/surroundPagination.vue';
import tweetEmbed from '~/components/tweetEmbed.vue';
import { article } from '~/types/article';

export default defineComponent({
    name: 'MainArticle',
    components: {
        surroundPagination,
        tweetEmbed,
    },
    props: {
        article: {
            type: Object as PropType<article>,
            required: true,
            default: () => {
                return {
                    dir: '',
                    path: '',
                    extension: '',
                    slug: '',
                    createdAt: '',
                    updatedAt: '',
                    body: {},
                    toc: [],
                    title: '',
                    description: '',
                    tags: [],
                };
            },
        },
    },
});
</script>

<style lang="scss" scoped>
::v-deep {
    h2 {
        padding-bottom: 0.5rem;
        margin: 1rem 0;
        display: inline-block;
        border-bottom: double 6px orange;
    }

    h3 {
        margin: 1rem 0;
        display: inline-block;
        border-bottom: dotted 3px orange;
    }

    a {
        color: orange !important;
    }

    pre {
        margin: 2rem 0;
    }

    table {
        margin: 2rem 0;
        border-collapse: collapse;
        th {
            border: solid 1px orange;
        }
        td {
            padding: 0.5rem;
            border: 1px white solid;
        }
    }

    ul {
        margin-bottom: 1rem;
    }

    img {
        max-width: min(50%, 400px);
        margin: 1rem 0;
    }

    blockquote {
        border-left: 5px solid orange;
        margin-left: 1rem;
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        max-width: min(80%, 640px);
        font-style: italic;
    }

    .nuxt-content-highlight code {
        all: unset !important;
    }
}
</style>

<template>
    <v-card :class="$vuetify.breakpoint.xs ? '' : 'px-10'">
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
                    <nuxt-link :to="`/tag/${tag}`">
                        {{tag}}
                    </nuxt-link>
                </span>
            </div>

        </v-card-subtitle>

        <v-card-text>
            <nuxt-content :document="article" />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@nuxtjs/composition-api';
import {article} from '~/types/article';

export default defineComponent({
    name: 'MainArticle',
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
                    tags: []
                };
            }
        }
    }
});
</script>

<style lang="scss" scoped>
::v-deep img {
    max-width: min(50%, 400px);
    margin: 1rem 0;
}
</style>

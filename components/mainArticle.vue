<template>
    <v-card>
        <v-card-title>
            {{ article.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ article.createdAt }}
        </v-card-subtitle>

        <v-card-text>
            <nuxt-content :document="article"/>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@nuxtjs/composition-api';
import {FetchReturn} from '@nuxt/content/types/query-builder';

export default defineComponent({
    name: 'MainArticle',
    props: {
        article: {
            type: Object as PropType<FetchReturn>,
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
                    toc: []
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

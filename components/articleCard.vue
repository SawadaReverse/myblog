<template>
    <v-card link :href="article.path" class="mb-3">
        <v-card-title>
            {{ article.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ article.createdAt }}
            <div v-if="article.tags">
                タグ:
                <span v-for="tag in article.tags">
                    <nuxt-link :to="`/tag/${tag}`" class="text-decoration-none">
                        {{tag}}
                    </nuxt-link>
                </span>
            </div>
        </v-card-subtitle>

        <v-card-text>
            {{ article.description }}
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@nuxtjs/composition-api';
import {articleHeaders} from '~/types/articleList';

export default defineComponent({
    name: 'ArticleCard',
    props: {
        article: {
            type: Object as PropType<articleHeaders>,
            required: true,
        }
    },
    setup() {

    }
});
</script>

<style scoped>

</style>

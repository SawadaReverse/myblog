<template>
    <v-container>
        <loading-indicator v-if="isLoading"/>
        <div v-for="article in articles" :key="article.path">
            <v-card link :href="article.path" class="mb-3">
                <v-card-title>
                    {{ article.title }}
                </v-card-title>

                <v-card-subtitle>
                    {{ article.createdAt }}
                </v-card-subtitle>

                <v-card-text>
                    {{ article.description }}
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script lang="ts">
import {defineComponent, ref, useAsync, useContext} from '@nuxtjs/composition-api';
import type {articleList, articleHeaders} from '~/types';
import loadingIndicator from '~/components/loadingIndicator.vue';

export default defineComponent({
    components: {
        loadingIndicator
    },
    setup() {
        const isLoading = ref<boolean>(true);
        const articles = ref<articleList>([]);
        const context = useContext();
        useAsync(async () => {
            const fetched = await context
                .$content('articles')
                .sortBy('createdAt', 'desc')
                .fetch<articleHeaders>();
            if (Array.isArray(fetched)) {
                articles.value = fetched;
            } else {
                articles.value.push(fetched);
            }

            isLoading.value = false;
        });

        return {
            isLoading,
            articles,
        };
    }
});
</script>

<template>
    <v-main>
        <v-overlay v-model="isLoading">
            <v-progress-circular
                indeterminate
            ></v-progress-circular>
        </v-overlay>

        <v-container v-for="article in articles" :key="article.path">
            <v-card link :href="article.path">
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
        </v-container>
    </v-main>
</template>

<script lang="ts">
import {defineComponent, ref, useAsync} from '@nuxtjs/composition-api';
import {FetchReturn} from "@nuxt/content/types/query-builder";

type articleHeaders = {
    title: string;
    description: string;
    createdAt: string;
}

type articleList = (articleHeaders & FetchReturn)[]

export default defineComponent({
    name: 'IndexPage',
    setup(_, context){
        const isLoading = ref<boolean>(true);
        const articles = ref<articleList>([]);

        const rootContext = context.root;
        useAsync(async () => {
            const fetched = await rootContext.$content('articles').sortBy('createdAt').fetch<articleHeaders>()
            if (Array.isArray(fetched)){
                articles.value = fetched
            } else {
                articles.value.push(fetched)
            }
            isLoading.value = false
        });

        return {
            articles,
            isLoading
        }
    }
});
</script>

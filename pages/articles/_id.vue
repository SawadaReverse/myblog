<template>
    <v-main>
        <v-overlay v-model="isLoading">
            <v-progress-circular
                indeterminate
            ></v-progress-circular>
        </v-overlay>

        <article>
            <v-card>
                <v-card-title>
                    {{article.title}}
                </v-card-title>

                <v-card-text>
                    <nuxt-content :document="article" />
                </v-card-text>
            </v-card>
        </article>
    </v-main>
</template>

<script lang="ts">
import {defineComponent, ref, useAsync, useRoute} from "@nuxtjs/composition-api";
import {FetchReturn} from "@nuxt/content/types/query-builder";

type errorParams = {
    statusCode: number;
    message:    string;
}

export default defineComponent({
    name: "ArticlePage",
    setup(_, context){
        const rootContext = context.root
        const route = useRoute()
        const articleID = route.value.params.id
        const article = ref<FetchReturn | FetchReturn[]>()
        const isLoading = ref<boolean>(true)

        useAsync(async () => {
            const loaded = await rootContext.$content(`articles/${articleID}`).fetch()
            if (Array.isArray(article)) {
                const e: errorParams = {
                    statusCode: 404,
                    message: ""
                }
                rootContext.error(e)
            }

            article.value = loaded
            isLoading.value = false
        })

        return {
            article,
            isLoading
        }
    }
});
</script>

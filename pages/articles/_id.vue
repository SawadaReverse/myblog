<template>
    <v-container>
        <loading-indicator v-if="isLoading"/>

        <article>
            <main-article :article="article"/>
        </article>
    </v-container>
</template>

<script lang="ts">
import {defineComponent, ref, useAsync, useContext, useRoute} from '@nuxtjs/composition-api';
import {FetchReturn} from '@nuxt/content/types/query-builder';
import mainArticle from '~/components/mainArticle.vue';
import loadingIndicator from '~/components/loadingIndicator.vue';
import {errorParams} from '~/types/error';

export default defineComponent({
    name: 'ArticlePage',
    components: {
        mainArticle,
        loadingIndicator
    },
    setup() {
        const context = useContext();
        const route = useRoute();
        const articleID = route.value.params.id;
        const article = ref<FetchReturn>();
        const isLoading = ref<boolean>(true);

        useAsync(async () => {
            const loaded = await context.$content(`articles/${articleID}`).fetch();
            if (Array.isArray(loaded)) {
                const e: errorParams = {
                    statusCode: 404,
                    message: ''
                };
                context.error(e);
                return;
            }
            article.value = loaded;
            isLoading.value = false;
        });

        return {
            article,
            isLoading
        };
    }
});
</script>

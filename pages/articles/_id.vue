<template>
    <v-container>
        <loading-indicator v-if="isLoading"/>

        <article>
            <main-article :article="article"/>
        </article>
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import mainArticle from '~/components/mainArticle.vue';
import loadingIndicator from '~/components/loadingIndicator.vue';
import {articlePage} from '~/src/articlePage'

export default defineComponent({
    name: 'ArticlePage',
    components: {
        mainArticle,
        loadingIndicator
    },
    setup(){
        return articlePage()
    }
});
</script>

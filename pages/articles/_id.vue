<template>
    <v-container>
        <loading-indicator v-if="isLoading"/>

        <article>
            <main-article :article="fetched"/>
        </article>
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import mainArticle from '~/components/mainArticle.vue';
import loadingIndicator from '~/components/loadingIndicator.vue';
import main from '~/src/articlePage'

export default defineComponent({
    name: 'ArticlePage',
    components: {
        mainArticle,
        loadingIndicator
    },
    setup(props, context){
        return main!(props, context)
    }
});
</script>

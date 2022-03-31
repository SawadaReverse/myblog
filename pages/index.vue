<template>
    <v-container>
        <loading-indicator v-if="isLoading"/>
        <div v-for="article in articles" :key="article.path">
            <article-card :article="article" />
        </div>
        <pagination :article-count="totalCount" />
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import loadingIndicator from '~/components/loadingIndicator.vue';
import pagination from '~/components/pagination.vue';
import articleCard from '~/components/articleCard.vue';
import {index} from '~/src/indexPage'
export default defineComponent({
    name: 'IndexPage',
    components: {
        loadingIndicator,
        pagination,
        articleCard
    },
    setup(props, context) {
        return index!(props, context)
    }
});
</script>

<template>
    <v-container>
        <h1 class="mb-3">タグ: {{tag}}</h1>
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
import articleCard from '~/components/articleCard.vue';
import pagination from '~/components/pagination.vue';
import {tagPage} from '~/src/tagPage'

export default defineComponent({
    name: 'TagPage',
    components: {
        loadingIndicator,
        articleCard,
        pagination
    },
    setup(){
        return tagPage();
    }
});
</script>


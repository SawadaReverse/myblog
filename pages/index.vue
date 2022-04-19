<template>
    <v-container>
        <loading-indicator v-if="isLoading" />
        <article-list :articles="articles" />
        <pagination :article-count="totalCount" />
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import loadingIndicator from '~/components/loadingIndicator.vue';
import pagination from '~/components/pagination.vue';
import articleList from '~/components/articleList.vue';
import {indexPage} from '~/src/indexPage'
export default defineComponent({
    name: 'IndexPage',
    components: {
        loadingIndicator,
        pagination,
        articleList
    },
    setup() {
        return indexPage();
    },
    head: {
        title: 'トップページ'
    }
});
</script>

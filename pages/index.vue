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
import {defineComponent, ref, useAsync, useContext, useRoute} from '@nuxtjs/composition-api';
import loadingIndicator from '~/components/loadingIndicator.vue';
import pagination from '~/components/pagination.vue';
import articleCard from '~/components/articleCard.vue';
import {articleList, articleHeaders} from '~/types/articleList';
import {pageQuery} from '~/types/pagination.d';

export default defineComponent({
    components: {
        loadingIndicator,
        pagination,
        articleCard
    },
    setup() {
        const {$content} = useContext();
        const route = useRoute();

        const isLoading = ref<boolean>(true);
        const articles = ref<articleList>([]);
        const totalCount = ref(0)
        let skip = 0

        const query = <pageQuery>route.value.query
        const pageQuery = Number(query.page)
        if (isNaN(pageQuery) || pageQuery < 1) {
            skip = 0
        } else {
            skip = 5 * (pageQuery - 1)
        }

        useAsync(async () => {
            const fetched = await $content('articles')
                .only(['title', 'description', 'createdAt', 'path', 'tags'])
                .sortBy('createdAt', 'desc')
                .limit(5)
                .skip(skip)
                .fetch<articleHeaders>();
            if (Array.isArray(fetched)) {
                articles.value = fetched;
            } else {
                articles.value.push(fetched);
            }

            const allFetch = await $content('articles')
            .only([])
            .fetch()
            if (Array.isArray(allFetch)) {
                totalCount.value = allFetch.length
            } else {
                totalCount.value = 1
            }

            console.log(articles.value)
            isLoading.value = false;
        });

        return {
            isLoading,
            articles,
            totalCount
        };
    }
});
</script>

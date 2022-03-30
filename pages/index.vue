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
import {computed, defineComponent, ref, useAsync, useContext, useRoute} from '@nuxtjs/composition-api';
import loadingIndicator from '~/components/loadingIndicator.vue';
import pagination from '~/components/pagination.vue';
import articleCard from '~/components/articleCard.vue';
import {article} from '~/types/article';
import {pageQuery} from '~/types/pagination';

export default defineComponent({
    components: {
        loadingIndicator,
        pagination,
        articleCard
    },
    setup() {
        const {$content, error} = useContext();
        const route = useRoute();
        const isLoading = ref<boolean>(true);
        const query = <pageQuery>route.value.query
        const pageQuery = Number(query.page)
        const skip = computed(() => {
            if (isNaN(pageQuery) || pageQuery < 1) {
                return 0
            } else {
                return 5 * (pageQuery - 1)
            }
        })

        const fetched = useAsync(() => $content('articles')
                                .only(['title', 'description', 'createdAt', 'path', 'tags'])
                                .sortBy('createdAt', 'desc')
                                .limit(5)
                                .skip(skip.value)
                                .fetch<article>()
        )

        const articles = computed(() => {
            if (fetched.value === null) {
                error({
                    statusCode: 500,
                    message: "fetched result is null"
                })
                return
            }
            if (Array.isArray(fetched.value)) {
                return fetched.value;
            } else {
                return [fetched.value];
            }
        })

        console.log(articles.value)

        const allFetch = useAsync(() => $content('articles').only([]).fetch<article>())

        const totalCount = computed(() => {
            if (fetched.value === null) {
                error({
                    statusCode: 500,
                    message: "all fetch result is null"
                })
                return
            }

            if (Array.isArray(allFetch)) {
                return allFetch.length
            } else {
                return 1
            }
        })

        console.log(totalCount.value)

        isLoading.value = false;

        return {
            isLoading,
            articles,
            totalCount
        };
    }
});
</script>

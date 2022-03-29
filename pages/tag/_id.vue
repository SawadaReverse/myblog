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
import {defineComponent, ref, useAsync, useContext, useRoute} from '@nuxtjs/composition-api';
import {articleHeaders} from '~/types/article';
import {pageQuery} from '~/types/pagination'

export default defineComponent({
    name: 'TagPage',
    setup(){
        const context = useContext()
        const {$content} = context

        let skip: number
        const route = useRoute()
        const tag = route.value.params.id
        const query = <pageQuery>route.value.query
        const pageQuery = Number(query.page)
        if (isNaN(pageQuery) || pageQuery < 1) {
            skip = 0
        } else {
            skip = 5 * (pageQuery - 1)
        }

        const articles = ref<articleHeaders[]>([])
        const isLoading = ref(true)
        const totalCount = ref(0)

        useAsync(async () => {
            const res = await $content('articles')
                            .only(['title', 'description', 'createdAt', 'path', 'tags'])
                            .where({'tags': {$contains: tag}})
                            .sortBy('createdAt', 'desc')
                            .skip(skip)
                            .limit(5)
                            .fetch<articleHeaders>()
            if (Array.isArray(res)) {
                articles.value = res
            }  else {
                articles.value.push(res)
            }

            const allFetch = await $content('articles')
                                .only([])
                                .where({'tags': {$contains: tag}})
                                .fetch()
            if (Array.isArray(allFetch)) {
                totalCount.value = allFetch.length
            } else {
                totalCount.value = 1
            }

            isLoading.value = false
        })

        return {
            tag,
            articles,
            isLoading,
            totalCount
        }
    }
});
</script>


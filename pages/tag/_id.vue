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
import {computed, defineComponent, ref, useAsync, useContext, useRoute} from '@nuxtjs/composition-api';
import {articleHeaders} from '~/types/article';
import {isPageQuery} from '~/lib/typeGuards/isPageQuery';

export default defineComponent({
    name: 'TagPage',
    setup(){
        const context = useContext()
        const {$content} = context
        const route = useRoute()
        const tag = route.value.params.id
        const pageQuery = computed((): number | undefined => {
            if (!isPageQuery(route.value.query)) return;
            return Number(route.value.query.page);
        });
        const skip = computed(() => {
            if (!pageQuery.value) {
                return 0;
            } else {
                return 5 * (pageQuery.value - 1);
            }
        });

        const articles = ref<articleHeaders[]>([])
        const isLoading = ref(true)
        const totalCount = ref(0)

        useAsync(async () => {
            const res = await $content('articles')
                            .only(['title', 'description', 'createdAt', 'path', 'tags'])
                            .where({'tags': {$contains: tag}})
                            .sortBy('createdAt', 'desc')
                            .skip(skip.value)
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


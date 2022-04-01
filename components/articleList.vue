<template>
    <div>
        <div v-for="article in articles" :key="article.path">
            <article-card :article="article" />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@nuxtjs/composition-api';
import articleCard from '~/components/articleCard.vue';
import {article} from '~/types/article';

export default defineComponent({
    name: 'ArticleList',
    components: {
        articleCard
    },
    props: {
        articles: {
            type: Array as PropType<article[]>,
            required: true
        }
    }
});
</script>


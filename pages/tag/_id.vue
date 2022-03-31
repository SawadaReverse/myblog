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
import main from '~/src/tagPage'

export default defineComponent({
    name: 'TagPage',
    setup(props,context){
        return main!(props, context)
    }
});
</script>


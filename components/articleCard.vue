<template>
    <v-card link :href="article.path" class="mb-3">
        <v-card-title>
            {{ article.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ article.createdAt }}
            <div v-if="article.tags">
                タグ:
                <span v-for="tag in article.tags" :key="tag">
                    <nuxt-link :to="`/tag/${tag}`" class="text-decoration-none">
                        {{tag}}
                    </nuxt-link>
                </span>
            </div>
        </v-card-subtitle>

        <v-card-text>
            {{ article.description }}
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {defineComponent, PropType, useContext} from '@nuxtjs/composition-api';
import {articleHeaders} from '~/types/article';

export default defineComponent({
    name: 'ArticleCard',
    props: {
        article: {
            type: Object as PropType<articleHeaders>,
            required: true,
        }
    },
    setup(props){
        const context = useContext()
        const {$dayjs} = context
        const edited = props.article
        edited.createdAt = $dayjs(edited.createdAt).format('YYYY/MM/DD HH:mm:ss')

        return {
            edited
        }
    }
});
</script>

<style scoped>

</style>

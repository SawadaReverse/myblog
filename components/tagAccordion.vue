<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            タグ
        </v-expansion-panel-header>

        <v-expansion-panel-content
            v-for="tag in tags"
            :key="tag"
        >
            {{tag}}
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import {defineComponent, ref, useAsync, useContext} from '@nuxtjs/composition-api';
import {FetchReturn} from '@nuxt/content/types/query-builder';
import {tagOnly} from '~/types/tag';

export default defineComponent({
    name: 'TagAccordion',
    setup() {
        const {$content} = useContext()
        const tags = ref<string[]>([])
        const apiResList = ref<(tagOnly & FetchReturn)[]>([])

        useAsync(async () => {
            const res = await $content('articles').only(['tags']).fetch<tagOnly>()
            if (Array.isArray(res)) {
                apiResList.value = Array.from(new Set(res))
            } else {
                apiResList.value.push(res)
            }

            console.log(apiResList)
            /*
            apiResList.value.forEach((item) => {
                if (item.tags !== []) {
                    item.tags.forEach((tag) => {
                        tags.value.push(tag)
                    })
                }
            })
             */

            tags.value = Array.from(new Set(tags.value))
        })


        return {
            tags
        }

    }
});
</script>


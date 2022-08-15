<template>
    <v-container>
        <h3 class="ml-3 mb-3">タグ</h3>
        <v-divider class="mb-5" />
        <v-virtual-scroll
            :item-height="40"
            :items="tags"
            :height="tagListHeight"
        >
            <template #default="tag">
                <v-list-item>
                    <v-list-item-content>
                        <nuxt-link
                            :to="`/tag/${tag.item}`"
                            class="text-decoration-none favorite-color"
                        >
                            {{ tag.item }}
                        </nuxt-link>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-container>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    useAsync,
    useContext,
} from '@nuxtjs/composition-api';
import { article, tagOnly } from '~/types/article';

export default defineComponent({
    name: 'TagList',
    setup() {
        const { $content } = useContext();
        const tags = ref<string[]>([]);
        const apiResList = ref<tagOnly[]>([]);

        useAsync(async () => {
            const res = await $content('articles')
                .only(['tags'])
                .fetch<article>();
            if (Array.isArray(res)) {
                apiResList.value = res;
            } else {
                apiResList.value = [res];
            }

            apiResList.value.forEach((item) => {
                if (item.tags !== []) {
                    item.tags.forEach((tag) => {
                        tags.value.push(tag);
                    });
                }
            });

            tags.value = Array.from(new Set(tags.value));
        });

        const viewHeight = document.documentElement.clientHeight / 100;
        const tagListHeight = 30 * viewHeight;
        return {
            tags,
            tagListHeight,
        };
    },
});
</script>

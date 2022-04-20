<template>
    <v-container>
        <h3 class="ml-3 mb-3">タグ</h3>
        <v-divider class="mb-5" />
        <v-list v-for="tag in tags" :key="tag" dense>
            <v-list-item>
                <nuxt-link
                    :to="`/tag/${tag}`"
                    class="text-decoration-none favorite-color"
                >
                    {{ tag }}
                </nuxt-link>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    useAsync,
    useContext,
    useRouter,
} from '@nuxtjs/composition-api';
import { article, tagOnly } from '~/types/article';

export default defineComponent({
    name: 'TagList',
    setup() {
        const { $content } = useContext();
        const router = useRouter();
        const tags = ref<string[]>([]);
        const apiResList = ref<tagOnly[]>([]);
        const nowSelect = ref();
        const jumpToTags = (tag: string) => {
            router.push(`/tag/${tag}`);
        };

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

        return {
            tags,
            nowSelect,
            jumpToTags,
        };
    },
});
</script>

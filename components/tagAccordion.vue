<template>
    <v-select
        select="nowSelect"
        :items="tags"
        label="タグ"
        solo
        @change="jumpToTags"
    />
</template>

<script lang="ts">
import {defineComponent, ref, useAsync, useContext, useRouter} from '@nuxtjs/composition-api';
import {tagOnly} from '~/types/article';

export default defineComponent({
    name: 'TagAccordion',
    setup() {
        const {$content} = useContext()
        const router = useRouter()
        const tags = ref<string[]>([])
        const apiResList = ref<tagOnly[]>([])
        const nowSelect = ref(0)
        const jumpToTags = (tag: string) => {
            nowSelect.value = 0
            router.push(`/tag/${tag}`)
        }

        useAsync(async () => {
            const res = await $content('articles').only(['tags']).fetch<tagOnly>()
            if (Array.isArray(res)) {
                apiResList.value = res
            } else {
                apiResList.value.push(res)
            }

            apiResList.value.forEach((item) => {
                // 型定義上undefinedにはなりえないが、tagが定義されていない場合はundefinedになる
                if (item.tags !== undefined) {
                    item.tags.forEach((tag) => {
                        tags.value.push(tag)
                    })
                }
            })

            tags.value = Array.from(new Set(tags.value))
        })

        return {
            tags,
            nowSelect,
            jumpToTags
        }

    }
});
</script>


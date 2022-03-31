<template>
    <v-container>
        <v-pagination
            v-model="nowSelect"
            :length="paginationLength"
            @input="jumpTo"
            @next="jumpToNext"
            @previous="jumpToPrev"
        />
    </v-container>
</template>

<script lang="ts">
import {computed, defineComponent, useRoute, useRouter} from '@nuxtjs/composition-api';
import {isPageQuery} from '~/lib/typeGuards/isPageQuery';

export default defineComponent({
    name: 'Pagination',
    props: {
        articleCount: {
            type: Number,
            default: 1,
            required: true
        }
    },
    setup(props, _){
        const route = useRoute()
        const router = useRouter()
        const pageQuery = computed((): number | undefined => {
            if (!isPageQuery(route.value.query)) return;
            return Number(route.value.query.page);
        });
        const nowSelect = computed((): number => {
            if (!pageQuery.value) {
                return 1
            } else {
                return pageQuery.value
            }
        })

        const paginationLength = Math.floor(props.articleCount / 5) + 1
        const jumpTo = (page: number) => {
            const nowPath = route.value.path
            router.push(`${nowPath}?page=${page}`)
        }
        const jumpToNext = () => {
            if (nowSelect.value !== paginationLength) {
                jumpTo(nowSelect.value + 1)
            }
        }
        const jumpToPrev = () => {
            if (nowSelect.value > 1) {
                jumpTo(nowSelect.value + 1)
            }
        }

        return {
            paginationLength,
            nowSelect,
            jumpTo,
            jumpToNext,
            jumpToPrev
        }
    }
});
</script>


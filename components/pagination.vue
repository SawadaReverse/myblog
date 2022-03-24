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
import {defineComponent, useRoute, useRouter} from '@nuxtjs/composition-api';
import {pageQuery} from '~/types/pagination.d';

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
        const query = <pageQuery>route.value.query
        let nowSelect = Number(query.page)
        if (isNaN(nowSelect) || nowSelect < 1) {
            nowSelect = 1
        }

        const paginationLength = (props.articleCount / 5) + 1
        const jumpTo = (page: number) => {
            const nowPath = route.value.path
            router.push(`${nowPath}?page=${page}`)
        }
        const jumpToNext = () => {
            if (nowSelect !== paginationLength) {
                jumpTo(nowSelect + 1)
            }
        }

        const jumpToPrev = () => {
            if (nowSelect > 1) {
                jumpTo(nowSelect + 1)
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


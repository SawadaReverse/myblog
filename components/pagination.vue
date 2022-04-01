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
import {getPageQuery} from '~/src/getPageQuery';
import {pageQuery} from '~/types/pageQuery';

export default defineComponent({
    name: 'PaginationComponent',
    props: {
        articleCount: {
            type: Number,
            required: true
        }
    },
    setup(props, _){
        const route = useRoute()
        const router = useRouter()
        const query = computed(() => getPageQuery(route.value.query as pageQuery))
        const nowSelect = query.value

        const paginationLength = computed(() => {
            return Math.floor(props.articleCount / 5) + 1
        })
        const jumpTo = (page: number) => {
            const nowPath = route.value.path
            if (page === 1){
                router.push(nowPath)
                return
            }
            router.push(`${nowPath}?page=${page}`)
        }
        const jumpToNext = () => {
            if (nowSelect !== paginationLength.value) {
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


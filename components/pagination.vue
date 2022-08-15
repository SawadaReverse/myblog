<template>
    <v-container>
        <v-pagination
            v-model="viewSelect"
            color="orange"
            :length="paginationLength"
            @input="jumpTo"
            @next="jumpToNext"
            @previous="jumpToPrev"
        />
    </v-container>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    ref,
    useRoute,
    useRouter,
} from '@nuxtjs/composition-api';
import { getPageQuery } from '~/src/getPageQuery';
import { pageQuery } from '~/types/pageQuery';

export default defineComponent({
    name: 'PaginationComponent',
    props: {
        articleCount: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const query = computed(() =>
            getPageQuery(route.value.query as pageQuery)
        );
        const nowSelect = computed(() => (query.value === 0 ? 1 : query.value));
        const viewSelect = ref(nowSelect.value);

        const paginationLength = computed(() => {
            if (props.articleCount % 5 === 0) {
                return props.articleCount / 5;
            }
            return Math.floor(props.articleCount / 5) + 1;
        });
        const jumpTo = (page: number) => {
            const nowPath = route.value.path;
            if (page === 1) {
                router.push(nowPath);
                return;
            }
            router.push(`${nowPath}?page=${page}`);
        };
        const jumpToNext = () => {
            if (nowSelect.value <= paginationLength.value) {
                jumpTo(nowSelect.value + 1);
            }
        };
        const jumpToPrev = () => {
            if (nowSelect.value >= 1) {
                jumpTo(nowSelect.value - 1);
            }
        };

        return {
            paginationLength,
            nowSelect,
            viewSelect,
            jumpTo,
            jumpToNext,
            jumpToPrev,
        };
    },
});
</script>

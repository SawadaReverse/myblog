import {
    computed,
    defineComponent,
    ref,
    useAsync,
    useContext,
    useRoute,
} from '@nuxtjs/composition-api';
import { articleHeaders } from '~/types/article';
import { pageQuery } from '~/types/pageQuery';
import { getPageQuery } from '~/src/getPageQuery';

const f = defineComponent({
    setup() {
        const context = useContext();
        const { $content } = context;
        const route = useRoute();
        const tag = route.value.params.id;

        const articles = ref<articleHeaders[]>([]);
        const isLoading = ref(true);
        const totalCount = ref(0);

        const skip = computed(() => {
            const query = getPageQuery(route.value.query as pageQuery);
            return (query - 1) * 5;
        });
        useAsync(async () => {
            const res = await $content('articles')
                .only(['title', 'description', 'createdAt', 'path', 'tags'])
                .where({ tags: { $contains: tag } })
                .sortBy('createdAt', 'desc')
                .skip(skip.value)
                .limit(5)
                .fetch<articleHeaders>();
            if (Array.isArray(res)) {
                articles.value = res;
            } else {
                articles.value.push(res);
            }

            const allFetch = await $content('articles')
                .only([])
                .where({ tags: { $contains: tag } })
                .fetch();
            if (Array.isArray(allFetch)) {
                totalCount.value = allFetch.length;
            } else {
                totalCount.value = 1;
            }

            isLoading.value = false;
        });

        return {
            tag,
            articles,
            isLoading,
            totalCount,
        };
    },
});

export default f.setup;

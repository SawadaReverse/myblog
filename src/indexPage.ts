import {
    computed,
    defineComponent,
    ref,
    useAsync,
    useContext,
    useRoute,
} from '@nuxtjs/composition-api';
import { getPageQuery } from '~/src/getPageQuery';
import { article } from '~/types/article';
import { pageQuery } from '~/types/pageQuery';

const main = defineComponent({
    setup() {
        const { $content } = useContext();
        const route = useRoute();
        const isLoading = ref<boolean>(true);

        const skip = computed(() => {
            const query = getPageQuery(route.value.query as pageQuery);
            return (query - 1) * 5;
        });

        const fetched = useAsync(() =>
            $content('articles')
                .only(['title', 'description', 'createdAt', 'path', 'tags'])
                .sortBy('createdAt', 'desc')
                .limit(5)
                .skip(skip.value)
                .fetch<article>()
        );

        const articles = computed(() => {
            // console.log(fetched.value);
            if (fetched.value === null) {
                return [];
            }
            if (Array.isArray(fetched.value)) {
                return fetched.value;
            } else {
                return [fetched.value];
            }
        });

        const allFetch = useAsync(() =>
            $content('articles').only([]).fetch<article>()
        );

        const totalCount = computed(() => {
            // console.log('total count: ', allFetch.value);
            if (allFetch.value === null) {
                return 0;
            }

            if (Array.isArray(allFetch)) {
                return allFetch.length;
            } else {
                return 1;
            }
        });

        isLoading.value = false;

        return {
            isLoading,
            articles,
            totalCount,
        };
    },
});

export const index = main.setup;

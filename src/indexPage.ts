import {
    computed,
    ref,
    useAsync,
    useContext,
    watch,
} from '@nuxtjs/composition-api';
import { getPageQuery } from '~/src/getPageQuery';
import { article } from '~/types/article';
import { pageQuery } from '~/types/pageQuery';

export const indexPage = () => {
    const { $content, query } = useContext();
    const isLoading = ref<boolean>(true);
    const fetched = ref<article | article[]>();

    const skip = computed(() => {
        const page = getPageQuery(<pageQuery>query.value);
        return (page - 1) * 5;
    });

    const getArticle = async () => {
        fetched.value = await $content('articles')
            .only(['title', 'description', 'createdAt', 'path', 'tags'])
            .sortBy('createdAt', 'desc')
            .limit(5)
            .skip(skip.value)
            .fetch<article>();
    };

    // 最初の1回
    getArticle();

    watch(skip, () => getArticle());

    const articles = computed<article[]>(() => {
        if (fetched.value === undefined) return [];

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
        if (allFetch.value === null) {
            return 0;
        }

        if (Array.isArray(allFetch.value)) {
            return allFetch.value.length;
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
};

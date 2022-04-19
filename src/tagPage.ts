import {
    computed,
    ref,
    useAsync,
    useContext,
    useMeta,
    watch,
} from '@nuxtjs/composition-api';
import { articleHeaders } from '~/types/article';
import { pageQuery } from '~/types/pageQuery';
import { getPageQuery } from '~/src/getPageQuery';

export const tagPage = () => {
    const { $content, query, params } = useContext();
    const tag = params.value.id;
    const articles = ref<articleHeaders[]>([]);
    const isLoading = ref(true);

    const skip = computed(() => {
        const page = getPageQuery(<pageQuery>query.value);
        return (page - 1) * 5;
    });

    const getTaggedArticles = async () => {
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
    };

    getTaggedArticles();

    watch(skip, () => getTaggedArticles());

    const allFetch = useAsync(() => {
        return $content('articles')
            .only([])
            .where({ tags: { $contains: tag } })
            .fetch();
    });

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

    // タイトルを動的に設定する
    const { title } = useMeta();
    title.value = computed(() => {
        return `タグ検索: ${tag}`;
    }).value;

    isLoading.value = false;

    return {
        tag,
        articles,
        isLoading,
        totalCount,
    };
};

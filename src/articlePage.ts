import { NuxtError } from '@nuxt/types';
import {
    computed,
    ref,
    useAsync,
    useContext,
    useMeta,
    watch,
} from '@nuxtjs/composition-api';
import { article } from '~/types/article';

export const articlePage = () => {
    const { $content, error, $dayjs, params } = useContext();
    const articleID = params.value.id;
    const isLoading = ref<boolean>(true);

    const t: article = {
        dir: '',
        path: '',
        extension: '',
        slug: '',
        createdAt: '',
        updatedAt: '',
        body: {},
        toc: [],
        title: '',
        description: '',
        tags: [],
    };

    const loaded = useAsync(() => {
        try {
            return $content(`articles/${articleID}`).fetch<article>();
        } catch (e) {
            console.error(e);
            const err: NuxtError = {
                statusCode: 404,
                message: 'failed to load article by article id',
            };
            error(err);
            return t;
        }
    });

    const fetched = computed(() => {
        if (loaded.value === null) {
            return t;
        } else if (Array.isArray(loaded.value)) {
            const err: NuxtError = {
                statusCode: 500,
                message: 'fetch result is array',
            };
            error(err);
            return t;
        }
        return loaded.value;
    });

    const convertedDate = computed(() => {
        if (loaded.value === null) {
            return '';
        } else if (Array.isArray(loaded.value)) {
            const err: NuxtError = {
                statusCode: 500,
                message: 'fetch result is array',
            };
            error(err);
            return '';
        }
        return $dayjs(loaded.value.createdAt).format('YYYY/MM/DD HH:mm:ss');
    });

    const article = computed(() => {
        const t = fetched.value;
        t.createdAt = convertedDate.value;
        return t;
    });

    // タイトルを動的に設定する
    const { title } = useMeta();
    watch(article, () => {
        title.value = article.value.title;
    });

    isLoading.value = false;

    return {
        article,
        isLoading,
    };
};

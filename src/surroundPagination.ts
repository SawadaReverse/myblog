import {
    computed,
    ref,
    useAsync,
    useContext,
    useRoute,
} from '@nuxtjs/composition-api';
import { article } from '~/types/article';

const surroundPagination = () => {
    const context = useContext();
    const { $content } = context;
    const route = useRoute();

    const isErr = ref(false);
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

    const path = route.value.path;

    const loaded = useAsync(() => {
        try {
            return $content('articles')
                .only(['title', 'path'])
                .sortBy('createdAt', 'desc')
                .surround(path)
                .fetch<article>();
        } catch (e) {
            isErr.value = true;
            return [t, t];
        }
    });

    const surroundArticles = computed(() => {
        if (!Array.isArray(loaded.value) || loaded.value === null) {
            return [t, t];
        }

        loaded.value.forEach((element, index, array) => {
            if (element === null) {
                array[index] = t;
            }
        });

        return loaded.value;
    });

    return {
        isErr,
        surroundArticles,
    };
};

export default surroundPagination;

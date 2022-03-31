import { NuxtError } from '@nuxt/types';
import {
    defineComponent,
    ref,
    useAsync,
    useContext,
    useRoute,
} from '@nuxtjs/composition-api';
import { article } from '~/types/article';

const f = defineComponent({
    setup() {
        const context = useContext();
        const { $content, $dayjs, error } = context;
        const route = useRoute();
        const articleID = route.value.params.id;
        const fetched = ref<article>({
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
        });
        const isLoading = ref<boolean>(true);

        useAsync(async () => {
            try {
                const loaded = await $content(
                    `articles/${articleID}`
                ).fetch<article>();
                if (Array.isArray(loaded)) {
                    error({
                        statusCode: 500,
                        message: 'fetch result is array',
                    });
                    return;
                }
                fetched.value = loaded;
            } catch (e) {
                const err: NuxtError = {
                    statusCode: 404,
                    message: 'failed to load article by article id',
                };
                error(err);
            }

            fetched.value.createdAt = $dayjs(fetched.value.createdAt).format(
                'YYYY/MM/DD HH:mm:ss'
            );
            isLoading.value = false;
        });

        return {
            fetched,
            isLoading,
        };
    },
});

export default f.setup;

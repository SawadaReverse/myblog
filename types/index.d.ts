import { FetchReturn } from '@nuxt/content/types/query-builder';

type articleHeaders = {
    title: string;
    description: string;
    createdAt: string;
};

type articleList = (articleHeaders & FetchReturn)[];

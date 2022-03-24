import { FetchReturn } from '@nuxt/content/types/query-builder';
import { tagOnly } from '~/types/tag';

export type articleHeaders = {
    path: string;
    title: string;
    description: string;
    createdAt: string;
} & tagOnly;

export type articleList = (articleHeaders & FetchReturn)[];

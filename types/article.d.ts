import { FetchReturn } from '@nuxt/content/types/query-builder';

export type tagOnly = {
    tags: string[];
};

export type articleHeaders = {
    path: string;
    title: string;
    description: string;
    createdAt: string;
} & tagOnly;

export type article = articleHeaders & FetchReturn;

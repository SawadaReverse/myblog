import { pageQuery } from '~/types/pagination';

export const isPageQuery = (v: any): v is pageQuery =>
    typeof v.page === 'string';

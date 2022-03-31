import { pageQuery } from '~/types/pageQuery';

const isPageQuery = (v: any): boolean => {
    if (typeof v === 'string') {
        const n = Number(v);
        return !isNaN(n) && n > 0;
    }
    return false;
};

export const getPageQuery = (query: pageQuery): number => {
    if (!isPageQuery(query.page)) return 1;
    return Number(query.page);
};

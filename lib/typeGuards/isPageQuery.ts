type pageQuery = {
    page: string;
};

export const isPageQuery = (v: any): v is pageQuery => {
    if (typeof v.page === 'string') {
        const n = Number(v.page);
        return !isNaN(n) && n > 0;
    }
    return false;
};

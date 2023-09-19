import { MicroCMSArticle, MicroCMSTag } from '@/libs/microCms/types';
import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk';

export type Tag = Pick<MicroCMSTag, 'id' | 'name'>;

export type Article = Pick<
  MicroCMSArticle,
  'id' | 'title' | 'description' | 'body' | 'tags' | 'publishedAt'
>;

export type GetArticleListQuery = Pick<
  MicroCMSQueries,
  'limit' | 'offset' | 'fields' | 'orders'
> & {
  tag?: string;
};

export type ListResponse<T> = Pick<
  MicroCMSListResponse<T>,
  'contents' | 'totalCount'
>;

export type ErrorResponse = {
  message: string;
  code: number;
};

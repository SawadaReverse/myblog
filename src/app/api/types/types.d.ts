import { Article, Tag } from '@/libs/microCms/types';
import { MicroCMSListResponse } from 'microcms-js-sdk';

export type ApiResponse<T> = {
  result?: T;
  message: string;
};

export type TagDetail = Tag & {
  articles: MicroCMSListResponse<Article>;
};

import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';

export type MicroCMSArticle = {
  title: string;
  description: string;
  publishedAt: string;
  body: string;
  path: string;
} & MicroCMSContentId &
  MicroCMSDate;

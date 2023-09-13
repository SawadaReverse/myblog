import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';

export type MicroCMSTag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type MicroCMSArticle = {
  title: string;
  description: string;
  publishedAt: string;
  body: string;
  tags: MicroCMSTag[];
  path: string;
} & MicroCMSContentId &
  MicroCMSDate;

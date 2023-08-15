import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type Article = {
  title: string;
  description: string;
  publishedAt: string;
  body: string;
  tags: Tag[];
  path: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type GetArticleListParams = {
  limit: number;
  offset?: number;
  fields?: string[];
  tag?: string;
  orders?: string;
  filters?: string;
  q?: string;
};

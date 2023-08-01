export type Tag = {
  id: string;
  name: string;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  body: string;
  tags: Tag[];
  path: string;
};

export type MicroCmsResponse<T> = {
  contents: T;
  totalCount: number;
  offset: number;
  limit: number;
};

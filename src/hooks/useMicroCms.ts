import { createClient } from "microcms-js-sdk";

type Tags = {
  id: string;
  name: string;
};

type Article = {
  title: string;
  description: string;
  body: string;
  tags: Tags[];
  path: string;
};

const useMicroCms = () => {
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!apiKey) {
    throw new Error("MICROCMS_API_KEY is not defined");
  }

  const microCms = createClient({
    serviceDomain: "sawada",
    apiKey,
  });

  const getArticle = (path: string) =>
    microCms
      .get<Article[]>({
        endpoint: "articles",
        queries: { filters: `path[equals]${path}` },
      })
      .then((article) => article[0])
      .catch((error) => {
        throw error;
      });

  const getArticles = async (page: number) =>
    microCms
      .get<Article[]>({
        endpoint: "articles",
        // TODO: ページあたりの表示件数を定数にする
        queries: { limit: 10, offset: 10 * (page - 1 < 0 ? 0 : page - 1) },
      })
      .then((articles) => articles)
      .catch((error) => {
        throw error;
      });

  const getTags = async () =>
    microCms
      .get<Tags[]>({ endpoint: "tags" })
      .then((tags) => tags)
      .catch((error) => {
        throw error;
      });
};

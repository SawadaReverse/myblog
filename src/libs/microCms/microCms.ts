import { createClient } from "microcms-js-sdk";
import { Article, MicroCmsResponse, Tag } from "./types";

export class MicroCms {
  private apiKey: string;
  constructor() {
    this.apiKey = process.env.MICROCMS_API_KEY;
    if (!this.apiKey) {
      throw new Error("MICROCMS_API_KEY is not defined");
    }
  }

  private newClient = () => {
    return createClient({
      serviceDomain: "sawada",
      apiKey: this.apiKey,
    });
  };

  public getArticle = async (path: string) => {
    const client = this.newClient();
    return client
      .get<MicroCmsResponse<Article[]>>({
        endpoint: "articles",
        queries: { filters: `path[equals]${path}` },
      })
      .then((article) => article.contents[0])
      .catch((error) => {
        throw error;
      });
  };

  public getArticles = async (page: number) => {
    const client = this.newClient();
    return client
      .get<MicroCmsResponse<Article[]>>({
        endpoint: "articles",
        // TODO: ページあたりの表示件数を定数にする
        queries: {
          limit: 10,
          offset: 10 * (page - 1 < 0 ? 0 : page - 1),
          fields: [
            "title",
            "path",
            "publishedAt",
            "tags",
            "description",
            "id",
          ].join(","),
          orders: "-publishedAt",
        },
      })
      .then((articles) => articles)
      .catch((error) => {
        throw error;
      });
  };

  public getTags = async () => {
    const client = this.newClient();
    return client
      .get<MicroCmsResponse<Tag[]>>({ endpoint: "tags" })
      .then((tags) => tags)
      .catch((error) => {
        throw error;
      });
  };
}

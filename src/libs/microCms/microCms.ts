import {
  MicroCMSListResponse,
  MicroCMSQueries,
  createClient,
} from "microcms-js-sdk";
import { Article, GetArticleListParams, Tag } from "./types";

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

  public getArticle = async (id: string) => {
    const client = this.newClient();
    return client
      .get<Article>({
        endpoint: `articles/${id}`,
      })
      .then((article) => article)
      .catch((error) => {
        throw error;
      });
  };

  public getArticleList = async (params: GetArticleListParams) => {
    const requestQueries: MicroCMSQueries = {
      limit: params.limit,
      offset: params.offset,
      fields: params.fields?.join(","),
      orders: params.orders ?? "-publishedAt",
      filters: params.filters,
      q: params.q,
    };
    if (!!params.tag) {
      requestQueries.filters = `tags[contains]${params.tag}`;
    }

    const client = this.newClient();
    return client
      .get<MicroCMSListResponse<Article>>({
        endpoint: "articles",
        // TODO: ページあたりの表示件数を定数にする
        queries: requestQueries,
      })
      .then((articles) => articles)
      .catch((error) => {
        throw error;
      });
  };

  public searchArticle = async (keyword: string) => {
    const client = this.newClient();
    return client
      .get<MicroCMSListResponse<Article>>({
        endpoint: "articles",
        queries: {
          q: keyword,
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

  public getTagLists = async () => {
    const client = this.newClient();
    return client
      .get<MicroCMSListResponse<Tag>>({ endpoint: "tags" })
      .then((tags) => tags)
      .catch((error) => {
        throw error;
      });
  };

  public getTag = async (id: string) => {
    const client = this.newClient();
    return client
      .get<Tag>({ endpoint: `tags/${id}` })
      .then((tag) => tag)
      .catch((error) => {
        throw error;
      });
  };
}

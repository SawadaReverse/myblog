import {
  MicroCMSListResponse,
  MicroCMSQueries,
  createClient,
} from 'microcms-js-sdk';
import { MicroCMSArticle } from './types';
import { GetArticleListQuery } from '@/app/api/types/types';

export class MicroCms {
  private apiKey: string;
  constructor() {
    const key = process.env.MICROCMS_API_KEY;
    if (!key) {
      throw new Error('MICROCMS_API_KEY is not defined');
    }

    this.apiKey = key;
  }

  private newClient = () => {
    return createClient({
      serviceDomain: 'sawada',
      apiKey: this.apiKey,
    });
  };

  public getArticle = async (id: string) => {
    const client = this.newClient();
    return client
      .get<MicroCMSArticle>({
        endpoint: `articles/${id}`,
      })
      .then((article) => article)
      .catch((error) => {
        throw error;
      });
  };

  public getArticleList = async (params: GetArticleListQuery) => {
    const requestQueries: MicroCMSQueries = {
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      orders: params.orders ?? '-publishedAt',
    };

    const client = this.newClient();
    return client
      .get<MicroCMSListResponse<MicroCMSArticle>>({
        endpoint: 'articles',
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
      .get<MicroCMSListResponse<MicroCMSArticle>>({
        endpoint: 'articles',
        queries: {
          q: keyword,
          fields: ['title', 'path', 'publishedAt', 'description', 'id'].join(
            ',',
          ),
          orders: '-publishedAt',
        },
      })
      .then((articles) => articles)
      .catch((error) => {
        throw error;
      });
  };
}

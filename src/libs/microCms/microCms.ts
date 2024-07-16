import {
  MicroCMSListResponse,
  MicroCMSQueries,
  createClient,
} from 'microcms-js-sdk';
import { MicroCMSArticle } from './types';

const apiKey = process.env.MICROCMS_API_KEY;
if (!apiKey) {
  throw new Error('MICROCMS_API_KEY is not defined');
}

const client = createClient({
  serviceDomain: 'sawada',
  apiKey,
});

export const getArticle = async (id: string) => {
  return client
    .get<MicroCMSArticle>({
      endpoint: `articles/${id}`,
    })
    .then((article) => article)
    .catch((error) => {
      throw error;
    });
};

export const getArticleList = async (params?: MicroCMSQueries) => {
  const queries = {
    ...params,
    orders: params?.orders ?? '-publishedAt',
  };

  return client
    .get<MicroCMSListResponse<MicroCMSArticle>>({
      endpoint: 'articles',
      queries: queries,
    })
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

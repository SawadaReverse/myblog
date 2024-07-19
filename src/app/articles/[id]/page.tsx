import ArticleDescription from '@/components/ArticleDescription';
import 'highlight.js/styles/github-dark.css';
import MarkdownParser from './components/MarkdownParser';
import { MicroCMSArticle } from '@/libs/microCms/types';
import { getAllArticleIDs, getArticle } from '@/libs/microCms/microCms';
import { StatusCodes } from 'http-status-codes';
import { Metadata } from 'next';
import { makeMetadata } from '@/libs/metadataMaker/metadataMaker';

export const generateStaticParams = async () => {
  let data: string[];
  try {
    data = await getAllArticleIDs();
  } catch (e) {
    console.error(e);
    const code =
      e && typeof e === 'object' && 'code' in e
        ? e.code
        : StatusCodes.INTERNAL_SERVER_ERROR;
    throw {
      code,
      message: `failed to fetch article`,
    };
  }

  return data.map((id) => ({ id }));
};

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  let data: MicroCMSArticle;
  try {
    data = await getArticle(id);
  } catch (e) {
    console.error(e);
    const code =
      e && typeof e === 'object' && 'code' in e
        ? e.code
        : StatusCodes.INTERNAL_SERVER_ERROR;
    throw {
      code,
      message: `failed to fetch article`,
    };
  }

  return makeMetadata({
    title: `${data.title}`,
    description: data.description,
    type: 'article',
    url: `/articles/${id}`,
  });
};

export default async function ArticlePage({ params: { id } }: Props) {
  let data: MicroCMSArticle;
  try {
    data = await getArticle(id);
  } catch (e) {
    console.error(e);
    const code =
      e && typeof e === 'object' && 'code' in e
        ? e.code
        : StatusCodes.INTERNAL_SERVER_ERROR;
    throw {
      code,
      message: `failed to fetch article`,
    };
  }

  return (
    <>
      <ArticleDescription article={data} />

      <MarkdownParser>{data.body}</MarkdownParser>
    </>
  );
}

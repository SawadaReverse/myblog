import { Metadata } from 'next';
import { DOMAIN, METADATA } from '../constants/constants';

type Props = {
  title: string;
  description: string;
  type: 'website' | 'article';
  url: string;
};

export const makeMetadata = ({
  title,
  description,
  type,
  url,
}: Props): Metadata => {
  return {
    metadataBase: new URL(`https://${DOMAIN}`),
    title: `${title}${METADATA.TITLE_SUFFIX}`,
    description: description,
    openGraph: {
      title,
      description: description,
      type,
      siteName: METADATA.SITE_NAME,
      url,
    },
    twitter: {
      title: `${title}${METADATA.TITLE_SUFFIX}`,
      description: description,
    },
  };
};

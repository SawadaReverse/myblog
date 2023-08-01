import type { AppProps } from "next/app";
import { Layout } from "./_layout";
import "styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <main>
        <Component {...pageProps} />;
      </main>
    </Layout>
  );
}

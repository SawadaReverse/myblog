import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "./_layout";
import { Box } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <main>
        <Component {...pageProps} />;
      </main>
    </Layout>
  );
}

namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXTAUTH_SECRET: string;
    MICROCMS_API_KEY: string;
  }
}

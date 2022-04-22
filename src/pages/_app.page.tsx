import Head from "next/head";
import type { AppProps } from "next/app";

import "styles/globals.scss";
import { NotificationProvider } from "context/NotificationContext";
import { AuthProvider } from "context/AuthContext";
import NextNProgress from "nextjs-progressbar";
import Layout from "./App/components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.png" />
      <title>TODO</title>
    </Head>
    {/* <PageProgress progress={isPageLoading} /> */}
    <NextNProgress
      options={{
        showSpinner: false,
      }}
    />
    <AuthProvider>
      <NotificationProvider>
        <div className="container">
          <Layout>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Layout>
        </div>
      </NotificationProvider>
    </AuthProvider>
  </>
);

export default MyApp;

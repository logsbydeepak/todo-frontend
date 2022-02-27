import Head from "next/head";
import type { AppProps } from "next/app";

import "styles/globals.scss";
import { NotificationProvider } from "context/NotificationContext";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <NotificationProvider>
      <div className="container">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </div>
    </NotificationProvider>
  </>
);

export default MyApp;

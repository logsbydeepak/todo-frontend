import Head from "next/head";
import type { AppProps } from "next/app";

import "styles/globals.scss";
import { NotificationProvider } from "context/NotificationContext";

const MyApp = ({ Component }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <NotificationProvider>
      <div className="container">
        <Component />
      </div>
    </NotificationProvider>
  </>
);

export default MyApp;

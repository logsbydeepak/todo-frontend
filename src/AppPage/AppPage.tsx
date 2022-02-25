import Head from "next/head";
import { NextPage } from "next";

import { NotificationProvider } from "global/context/NotificationContext";

export const AppPage: NextPage = ({ children }) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <NotificationProvider>
      <div className="container">{children}</div>
    </NotificationProvider>
  </>
);

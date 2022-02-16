import Head from "next/head";
import Navbar from "./components/Navbar";

import { NotificationProvider, AuthProvider } from "global/context";
import { NextPage } from "next";

export const AppPage: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <NotificationProvider>
        <AuthProvider>
          <Navbar />
          <div className="container">{children}</div>
        </AuthProvider>
      </NotificationProvider>
    </>
  );
};

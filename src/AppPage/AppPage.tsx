import Head from "next/head";
import { NextPage } from "next";

import { AuthProvider } from "global/context/AuthContext";
import { NotificationProvider } from "global/context/NotificationContext";

import { Navbar } from "./components/Navbar";

export const AppPage: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <NotificationProvider>
        <AuthProvider>
          <div className="container">{children}</div>
        </AuthProvider>
      </NotificationProvider>
    </>
  );
};

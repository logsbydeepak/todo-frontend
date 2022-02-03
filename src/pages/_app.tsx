import Head from "next/head";
import type { AppProps } from "next/app";

import "styles/globals.scss";
import Navbar from "modules/common/Navbar";

import NotificationProvider from "modules/context/NotificationContext";
import AuthProvider from "modules/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <NotificationProvider>
        <AuthProvider>
          <Navbar />
          <div className="container">
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </NotificationProvider>
    </>
  );
}

export default MyApp;

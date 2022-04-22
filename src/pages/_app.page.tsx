import Head from "next/head";
import type { AppProps } from "next/app";

import "styles/globals.scss";
import { NotificationProvider } from "context/NotificationContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "context/AuthContext";
import { PageProgress } from "./App/components/progress";
import Layout from "./App/components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsPageLoading(true));
    router.events.on("routeChangeComplete", () => setIsPageLoading(false));
    router.events.on("routeChangeError", () => setIsPageLoading(false));

    return () => {
      router.events.off("routeChangeStart", () => setIsPageLoading(true));
      router.events.off("routeChangeComplete", () => setIsPageLoading(false));
      router.events.off("routeChangeError", () => setIsPageLoading(false));
    };
  }, [router]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>TODO</title>
      </Head>
      <PageProgress progress={isPageLoading} />
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
};

export default MyApp;

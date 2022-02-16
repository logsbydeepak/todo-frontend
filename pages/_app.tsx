import type { AppProps } from "next/app";

import AppPage from "AppPage";
import "global/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppPage>
    <Component {...pageProps} />
  </AppPage>
);

export default MyApp;

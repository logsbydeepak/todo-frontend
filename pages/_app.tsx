import type { AppProps } from "next/app";

import AppPage from "AppPage";
import "global/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppPage>
      <Component {...pageProps} />
    </AppPage>
  );
}

export default MyApp;

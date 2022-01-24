import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { AuthContext } from "helper/authContext";
import Notification from "components/Notification";

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function MyApp({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState(false);

  myUseLayoutEffect(() => {
    const initialAuth = localStorage.getItem("auth");
    if (initialAuth === null) {
      localStorage.setItem("auth", "false");
    }
    setAuth(localStorage.getItem("auth") === "true");
  });

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Notification>
        <AuthContext.Provider
          value={{
            auth,
            changeAuth: (value: boolean) => {
              setAuth(value);
              localStorage.setItem("auth", value.toString());
            },
          }}
        >
          <Navbar />
          <div className="container">
            <Component {...pageProps} />
          </div>
        </AuthContext.Provider>
      </Notification>
    </>
  );
}

export default MyApp;

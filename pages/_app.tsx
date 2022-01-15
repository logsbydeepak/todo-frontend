import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { AuthContext } from "helper/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const initialAuth = localStorage.getItem("auth");

    if (initialAuth === null) {
      localStorage.setItem("auth", "false");
    }

    setAuth(localStorage.getItem("auth") === "true");
  });

  const setStorage = (value: string) => {
    localStorage.setItem("auth", value);
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
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
    </>
  );
}

export default MyApp;

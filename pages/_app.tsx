import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import { useEffect, useReducer, useState } from "react";
import axiosConfig from "@config/axios";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

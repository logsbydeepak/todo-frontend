import "../styles/globals.scss";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";

const links = [
  {
    name: "Login",
    link: "/Login",
  },
  {
    name: "Sign Up",
    link: "/SignUp",
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar links={links} />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

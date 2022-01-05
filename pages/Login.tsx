import Head from "next/head";
import type { NextPage } from "next";

import Input from "../components/Input";
import PageTitle from "../components/PageTitle";
import Link from "next/link";
import landingPageStyle from "../styles/Landing.module.scss";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>TODO - Login</title>
      </Head>
      <div>
        <PageTitle title="Login Account" subtitle="Access your created todo" />

        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
      </div>
    </>
  );
};

export default Login;

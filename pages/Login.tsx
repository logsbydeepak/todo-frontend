import Head from "next/head";
import type { NextPage } from "next";

import Input from "../components/Input";
import PageTitle from "../components/PageTitle";
import { ButtonIcon } from "../components/Button";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>TODO - Login</title>
      </Head>
      <div>
        <PageTitle title="Login Account" subtitle="Access your created todo" />
      </div>
    </>
  );
};

export default Login;

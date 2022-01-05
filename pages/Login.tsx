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

        <Input name="email" placeholder="Email" type="email" autoFocus={true} />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          autoFocus={false}
        />
        <ButtonIcon icon="east" text="Login to your account" type="primary" />
      </div>
    </>
  );
};

export default Login;

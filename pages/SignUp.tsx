import Head from "next/head";
import type { NextPage } from "next";
import PageTitle from "../components/PageTitle";
import Input from "../components/Input";
import { ButtonIcon } from "../components/Button";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>TODO - SignUp</title>
      </Head>
      <div>
        <PageTitle
          title="Create Account"
          subtitle="Create your account to get started"
        />

        <Input name="name" placeholder="Name" type="text" autoFocus={true} />
        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
        <ButtonIcon icon="east" text="Create your account" type="primary" />
      </div>
    </>
  );
};

export default SignUp;

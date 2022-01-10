import Head from "next/head";
import type { NextPage } from "next";

import Input from "../components/Input";
import PageTitle from "../components/PageTitle";
import { ButtonIcon } from "../components/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import axiosConfig from "@config/axios";
import loginStyle from "../styles/module/pages/LoginSignUp.module.scss";

const Login: NextPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [helper, setHelper] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState({
    email: false,
    password: false,
  });

  const formInputHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clickHandler = async (e: any) => {
    e.preventDefault();

    const helperText = { name: "", email: "", password: "" };
    const isErrorStatus = { name: false, email: false, password: false };

    if (!isEmail(formData.email)) {
      helperText.email = "invalid email";
      isErrorStatus.email = true;
    }

    if (formData.email.length === 0) {
      helperText.email = "email is required";
      isErrorStatus.email = true;
    }

    if (!isStrongPassword(formData.password)) {
      helperText.password =
        "min of 8 characters, 1 lower case, upper case, symbol";
      isErrorStatus.password = true;
    }

    if (formData.password.length === 0) {
      helperText.password = "password is required";
      isErrorStatus.password = true;
    }

    setHelper(helperText);
    setIsError(isErrorStatus);

    if (!isEmail(formData.email) || !isStrongPassword(formData.password)) {
      return;
    }

    try {
      await axiosConfig.post("/session", formData);
      router.push("/");
    } catch (e: any) {
      console.log(e.request);
    }
  };

  return (
    <>
      <Head>
        <title>TODO - Login</title>
      </Head>
      <div className={loginStyle.base}>
        <PageTitle title="Login Account" subtitle="Access your created todo" />
        <form>
          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={formInputHandler}
            helper={helper.email}
            placeholder="example@email.com"
            isError={isError.email}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={formInputHandler}
            helper={helper.password}
            placeholder="Minimum 8 character"
            isError={isError.password}
          />
          <ButtonIcon
            icon="east"
            text="Create your account"
            type="primary"
            clickHandler={clickHandler}
          />
        </form>
      </div>
    </>
  );
};

export default Login;

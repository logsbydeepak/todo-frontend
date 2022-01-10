import Head from "next/head";
import type { NextPage } from "next";
import PageTitle from "../components/PageTitle";
import Input from "../components/Input";
import { ButtonIcon } from "../components/Button";
import { EventHandler, useState } from "react";
import { useRouter } from "next/router";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import signUpStyle from "../styles/module/pages/SignUp.module.scss";

import axios from "@config/axios";

const SignUp: NextPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [helper, setHelper] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState({
    name: false,
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

    if (formData.name.length === 0) {
      helperText.name = "name is required";
      isErrorStatus.name = true;
    }

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

    if (
      formData.name.length === 0 ||
      !isEmail(formData.email) ||
      !isStrongPassword(formData.password)
    ) {
      return;
    }

    try {
      await axios.post("/user", formData);
      router.push("/");
    } catch (e: any) {
      console.log(e.request);
    }
  };

  return (
    <>
      <Head>
        <title>TODO - SignUp</title>
      </Head>
      <div className={signUpStyle.base}>
        <PageTitle
          title="Create Account"
          subtitle="Create your account to get started"
        />

        <form>
          <Input
            name="name"
            label="Name"
            type="text"
            autoFocus={true}
            value={formData.name}
            onChange={formInputHandler}
            helper={helper.name}
            placeholder="Your name"
            isError={isError.name}
          />
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

export default SignUp;

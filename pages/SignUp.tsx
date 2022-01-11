import Head from "next/head";
import type { NextPage } from "next";
import PageTitle from "../components/PageTitle";
import Input from "../components/Input";
import { ButtonIcon } from "../components/Button";
import { EventHandler, useContext, useState } from "react";
import { useRouter } from "next/router";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import signUpStyle from "../styles/module/pages/LoginSignUp.module.scss";

import { axiosRequest } from "@config/axios";
import { AuthContext } from "context/auth.context";

const initialUserData = {
  name: "",
  email: "",
  password: "",
};

const initialErrorData = {
  name: false,
  email: false,
  password: false,
};

const SignUp: NextPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialUserData);
  const [helper, setHelper] = useState(initialUserData);
  const [isError, setIsError] = useState(initialErrorData);
  const [isHeadingStatus, setHeadingStatus] = useState({
    status: false,
    message: "",
    type: "error",
  });

  const formInputHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { changeAuth } = useContext(AuthContext);
  const clickHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const helperText = { ...initialUserData };
    const isErrorStatus = { ...initialErrorData };

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
    setLoading(false);

    if (
      formData.name.length === 0 ||
      !isEmail(formData.email) ||
      !isStrongPassword(formData.password)
    ) {
      return;
    }

    try {
      setLoading(true);
      await axiosRequest.post("/user", formData);
      setHeadingStatus({
        message: "User created successfully.",
        status: true,
        type: "success",
      });
      router.push("/");
      changeAuth(true);
    } catch (e: any) {
      setHeadingStatus({
        message: "Something went wrong. Please try again.",
        status: true,
        type: "error",
      });
      setLoading(false);
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

        {isHeadingStatus.status && (
          <h1
            className={`
              ${signUpStyle.heading} ${signUpStyle[isHeadingStatus.type]}`}
          >
            {isHeadingStatus.message}
          </h1>
        )}

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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
          <ButtonIcon
            icon="east"
            text="Create your account"
            type="primary"
            clickHandler={clickHandler}
            loading={loading}
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;

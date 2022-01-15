import { useContext, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import Input from "components/Input";
import PageTitle from "components/PageTitle";
import { ButtonIcon } from "components/Button";
import style from "styles/module/pages/LoginSignUp.module.scss";

import { axiosRequest } from "helper/axios";
import { AuthContext } from "helper/authContext";

const initialUserData = {
  email: "",
  password: "",
};

const initialErrorData = {
  email: false,
  password: false,
};

const initialHeadingStatus: {
  status: boolean;
  message: string;
  type: "error" | "success";
} = {
  status: false,
  message: "",
  type: "error",
};

const Login: NextPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState(initialUserData);
  const [isError, setIsError] = useState(initialErrorData);
  const [formData, setFormData] = useState(initialUserData);
  const [isHeadingStatus, setHeadingStatus] = useState(initialHeadingStatus);

  const formInputHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { changeAuth } = useContext(AuthContext);

  const clickHandler = async (event: Event) => {
    event.preventDefault();

    setLoading(true);
    const helperText = { ...initialUserData };
    const isErrorStatus = { ...initialErrorData };

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

    if (!isEmail(formData.email) || !isStrongPassword(formData.password)) {
      return;
    }

    try {
      setLoading(true);
      await axiosRequest.post("/session", formData);
      setHeadingStatus({
        message: "User sign in successfully.",
        status: true,
        type: "success",
      });

      changeAuth(true);
      router.push("/");
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
        <title>TODO - Login</title>
      </Head>
      <div className={style.base}>
        <PageTitle title="Login Account" subtitle="Access your created todo" />

        {isHeadingStatus.status && (
          <h1
            className={`
              ${style.heading} ${style[isHeadingStatus.type]}`}
          >
            {isHeadingStatus.message}
          </h1>
        )}

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

export default Login;

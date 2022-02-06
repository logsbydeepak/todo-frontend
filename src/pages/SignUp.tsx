import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import Input from "modules/common/Input";
import PageTitle from "modules/common/PageTitle";
import { ButtonWithTextAndIcon } from "modules/common/Button";
import style from "styles/modules/layout/pages/LoginSignUp.module.scss";

import { axiosRequest } from "helper/axios.helper";
import { useAuthContext } from "modules/context/AuthContext";
import { useNotificationContext } from "modules/context/NotificationContext";

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
  const [helper, setHelper] = useState(initialUserData);
  const [isError, setIsError] = useState(initialErrorData);
  const [formData, setFormData] = useState(initialUserData);

  const { auth, changeAuth } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [auth, router]);

  const formInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const clickHandler = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setHelper(initialUserData);
    setIsError(initialErrorData);
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

    setTimeout(() => {
      setHelper(helperText);
      setIsError(isErrorStatus);
      setLoading(false);
    }, 1000);

    if (
      formData.name.length === 0 ||
      !isEmail(formData.email) ||
      !isStrongPassword(formData.password)
    )
      return;

    try {
      await axiosRequest.post("/user", formData);
      dispatchNotification({
        type: "SUCCESS",
        message: "User created successfully",
      });

      changeAuth(true);
      router.push("/");
    } catch (e: any) {
      dispatchNotification({
        type: "ERROR",
        message: "Something went wrong",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>TODO - SignUp</title>
      </Head>
      <div className={style.base}>
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
          <ButtonWithTextAndIcon
            icon="east"
            text="Create your account"
            clickHandler={clickHandler}
            loading={loading}
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;

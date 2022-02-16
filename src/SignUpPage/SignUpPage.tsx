import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import {
  Input,
  InputWithIcon,
  PageTitle,
  ButtonWithTextAndIcon,
} from "global/components";
import style from "../LoginPage/loginSignUp.page.module.scss";

import { axiosRequest } from "global/helper";
import { useAuthContext } from "global/context";
import { useNotificationContext } from "global/context";
import { useImmer } from "use-immer";

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

export const SignUpPage: NextPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useImmer({
    isLoading: false,
    helper: initialUserData,
    value: initialUserData,
    isError: initialErrorData,
  });

  const { auth, changeAuth } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [auth, router]);

  const formInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;
    if (
      !(
        inputName === "name" ||
        inputName === "email" ||
        inputName === "password"
      )
    )
      return;
    setFormState((draft) => {
      draft.value[inputName] = inputValue;
    });
  };

  const clickHandler = (event: FormEvent) => {
    event.preventDefault();

    setFormState((draft) => {
      draft.isLoading = true;
      draft.helper = initialUserData;
      draft.isError = initialErrorData;
    });

    const helperText = { ...initialUserData };
    const isErrorStatus = { ...initialErrorData };

    if (formState.value.name.length === 0) {
      helperText.name = "name is required";
      isErrorStatus.name = true;
    }

    if (!isEmail(formState.value.email)) {
      helperText.email = "invalid email";
      isErrorStatus.email = true;
    }

    if (formState.value.email.length === 0) {
      helperText.email = "email is required";
      isErrorStatus.email = true;
    }

    if (!isStrongPassword(formState.value.password)) {
      helperText.password =
        "min of 8 characters, 1 lower case, upper case, symbol";
      isErrorStatus.password = true;
    }

    if (formState.value.password.length === 0) {
      helperText.password = "password is required";
      isErrorStatus.password = true;
    }

    if (
      formState.value.name.length === 0 ||
      !isEmail(formState.value.email) ||
      !isStrongPassword(formState.value.password)
    ) {
      setFormState((draft) => {
        draft.isLoading = false;
        draft.helper = helperText;
        draft.isError = isErrorStatus;
      });
      return;
    }

    axiosRequest({
      method: "POST",
      url: "/user",
      data: formState.value,
    })
      .then(() => {
        changeAuth(true);
        dispatchNotification({
          type: "SUCCESS",
          message: "User created successfully",
        });
      })
      .catch(() => {
        dispatchNotification({
          type: "ERROR",
          message: "Something went wrong",
        });

        setFormState((draft) => {
          draft.isLoading = false;
        });
      });
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
            value={formState.value.name}
            onChange={formInputHandler}
            helper={formState.helper.name}
            placeholder="Your name"
            isError={formState.isError.name}
            disabled={formState.isLoading}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            value={formState.value.email}
            onChange={formInputHandler}
            helper={formState.helper.email}
            placeholder="example@email.com"
            isError={formState.isError.email}
            disabled={formState.isLoading}
          />

          <InputWithIcon
            value={formState.value.password}
            handleOnChange={formInputHandler}
            helper={formState.helper.password}
            type="password"
            placeholder="Minimum 8 character"
            label="Password"
            name="password"
            isError={formState.isError.password}
            isDisabled={formState.isLoading}
          />

          <ButtonWithTextAndIcon
            icon="east"
            text="Create your account"
            clickHandler={clickHandler}
            loading={formState.isLoading}
            isDisabled={formState.isLoading}
          />
        </form>
      </div>
    </>
  );
};

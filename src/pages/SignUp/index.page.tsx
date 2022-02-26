import React, { ChangeEvent } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useImmer } from "use-immer";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { axiosRequest, createAuthCookie } from "helper";
import { SimpleInput, InputWithIcon } from "components/Input";
import { PageTitle } from "components/PageTitle";
import { ButtonWithTextAndIcon } from "components/Button";
import { useNotificationContext } from "context/NotificationContext";

import { Navbar } from "components/Navbar";
import { GetServerSideProps } from "next";
import { initialErrorData, initialUserData } from "./helper/data";

import style from "./SignUp.module.scss";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = req.cookies.auth === "true";

  if (auth) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return { props: {} };
};

export const SignUp: NextPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useImmer({
    isLoading: false,
    helper: initialUserData,
    value: initialUserData,
    isError: initialErrorData,
  });

  const { dispatchNotification } = useNotificationContext();

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

  const handleSignUp = () => {
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
        "min of 8 characters, 1 lower case, upper case, symbol, number";
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
        createAuthCookie();
        dispatchNotification({
          type: "SUCCESS",
          message: "User created successfully",
        });
        router.push("/");
      })

      .catch((error: any) => {
        const { message } = error.response.data.error;

        if (message === "email already exists") {
          setFormState((draft) => {
            draft.helper.email = "user already exists";
            draft.isError.email = true;
            draft.isLoading = false;
          });
          return;
        }

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
      <Navbar auth={false} />
      <Head>
        <title>TODO - SignUp</title>
      </Head>
      <div className={style.base}>
        <PageTitle
          title="Create Account"
          subtitle="Create your account to get started"
        />

        <form>
          <SimpleInput
            name="name"
            label="Name"
            type="text"
            autoFocus
            value={formState.value.name}
            onChange={formInputHandler}
            helper={formState.helper.name}
            placeholder="Your name"
            isError={formState.isError.name}
            disabled={formState.isLoading}
          />
          <SimpleInput
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

          <div className={style.button}>
            <ButtonWithTextAndIcon
              icon="east"
              text="Create your account"
              handleOnClick={handleSignUp}
              isLoading={formState.isLoading}
              isDisabled={formState.isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

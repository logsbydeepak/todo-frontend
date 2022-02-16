import { ChangeEvent, useEffect, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import Input, { InputWithIcon } from "components/common/Input";
import PageTitle from "components/common/PageTitle";
import { ButtonWithTextAndIcon } from "components/common/Button";
import style from "styles/pages/loginSignUp.page.module.scss";

import { axiosRequest } from "lib/helper/axios.helper";
import { useNotificationContext } from "lib/context/NotificationContext";
import { useAuthContext } from "lib/context/AuthContext";
import { Updater, useImmer } from "use-immer";

const initialUserData = {
  email: "",
  password: "",
};

const initialErrorData = {
  email: false,
  password: false,
};

type SetFormStateType = Updater<{
  isLoading: boolean;
  isError: {
    email: boolean;
    password: boolean;
  };
  helper: {
    email: string;
    password: string;
  };
  value: {
    email: string;
    password: string;
  };
}>;

const setInputEmptyError = (
  input: "email" | "password",
  setFormState: SetFormStateType
) => {
  setFormState((draft) => {
    draft.helper[input] = `${input} is required`;
    draft.isError[input] = true;
    draft.isLoading = false;
  });
};

const setInputInvalidError = (setFormState: SetFormStateType) => {
  setFormState((draft) => {
    draft.helper = {
      email: "email or password is invalid",
      password: "email or password is invalid",
    };
    draft.isError = { email: true, password: true };
    draft.isLoading = false;
  });
};

const Login: NextPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useImmer({
    isLoading: false,
    isError: initialErrorData,
    helper: initialUserData,
    value: initialUserData,
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
    if (!(inputName === "email" || inputName === "password")) return;
    setFormState((draft) => {
      draft.value[inputName] = inputValue;
    });
  };

  const clickHandler = async (event: Event) => {
    event.preventDefault();

    setFormState((draft) => {
      draft.isLoading = true;
      draft.helper = initialUserData;
      draft.isError = initialErrorData;
    });

    if (formState.value.email.length === 0) {
      setInputEmptyError("email", setFormState);
      return;
    }

    if (formState.value.password.length === 0) {
      setInputEmptyError("password", setFormState);
      return;
    }

    if (
      !isEmail(formState.value.email) ||
      !isStrongPassword(formState.value.password)
    ) {
      setInputInvalidError(setFormState);
      return;
    }

    try {
      await axiosRequest.post("/session", formState.value);

      changeAuth(true);
      dispatchNotification({
        type: "SUCCESS",
        message: "User sign in successfully",
      });

      router.push("/");
    } catch (error: any) {
      if (error.response.data.error.message === "user do not exist") {
        setInputInvalidError(setFormState);
        return;
      }
      dispatchNotification({
        type: "ERROR",
        message: "Something went wrong",
      });

      setFormState((draft) => {
        draft.isLoading = false;
      });
    }
  };

  return (
    <>
      <Head>
        <title>TODO - Login</title>
      </Head>
      <div className={style.base}>
        <PageTitle title="Login Account" subtitle="Access your created todo" />

        <form>
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
            autoFocus={true}
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

export default Login;

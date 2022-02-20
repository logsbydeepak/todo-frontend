import { ChangeEvent, useEffect } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useImmer } from "use-immer";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { axiosRequest } from "global/helper";
import { PageTitle } from "global/components/PageTitle";
import { useAuthContext } from "global/context/AuthContext";
import { ButtonWithTextAndIcon } from "global/components/Button";
import { SimpleInput, InputWithIcon } from "global/components/Input";
import { useNotificationContext } from "global/context/NotificationContext";

import {
  setInputEmptyError,
  setInputInvalidError,
} from "./helper/handleInputError";
import { initialErrorData, initialUserData } from "./helper/data";

import style from "./Login.module.scss";

export const LoginPage: NextPage = () => {
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

  const handleLogin = async () => {
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
      <div className={style.container}>
        <PageTitle title="Login Account" subtitle="Access your created todo" />

        <form>
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

          <div className={style.button}>
            <ButtonWithTextAndIcon
              icon="east"
              text="Create your account"
              handleOnClick={handleLogin}
              isLoading={formState.isLoading}
              isDisabled={formState.isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

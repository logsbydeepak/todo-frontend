import { ChangeEvent } from "react";

import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import { useImmer } from "use-immer";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import { axiosRequest, createAuthCookie } from "helper";
import { PageTitle } from "components/PageTitle";
import { ButtonWithTextAndIcon } from "components/Button";
import { SimpleInput, InputWithIcon } from "components/Input";
import { useNotificationContext } from "context/NotificationContext";

import { Navbar } from "components/Navbar";
import { initialErrorData, initialUserData } from "./helper/data";

import style from "./Login.module.scss";

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

export const Login: NextPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useImmer({
    isLoading: false,
    isError: initialErrorData,
    helper: initialUserData,
    value: initialUserData,
  });

  const { dispatchNotification } = useNotificationContext();

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

    const helperText = { ...initialUserData };
    const isErrorStatus = { ...initialErrorData };

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

    try {
      await axiosRequest.post("/session", formState.value);

      createAuthCookie();

      dispatchNotification({
        type: "SUCCESS",
        message: "User sign in successfully",
      });

      router.push("/");
    } catch (error: any) {
      const { message } = error.response.data.error;

      if (message === "user do not exist") {
        setFormState((draft) => {
          draft.helper.email = "user don't exist";
          draft.isError.email = true;
          draft.isLoading = false;
        });
        return;
      }

      if (message === "invalid password") {
        setFormState((draft) => {
          draft.helper.password = "invalid password";
          draft.isError.password = true;
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
    }
  };

  return (
    <>
      <Navbar auth={false} />
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
            autoFocus
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

export default Login;

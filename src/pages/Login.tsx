import { useEffect, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import Input from "components/common/Input";
import PageTitle from "components/common/PageTitle";
import { ButtonWithTextAndIcon } from "components/common/Button";
import style from "styles/pages/loginSignUp.page.module.scss";

import { axiosRequest } from "lib/helper/axios.helper";
import { useNotificationContext } from "lib/context/NotificationContext";
import { useAuthContext } from "lib/context/AuthContext";

const initialUserData = {
  email: "",
  password: "",
};

const initialErrorData = {
  email: false,
  password: false,
};

const Login: NextPage = () => {
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

  const formInputHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clickHandler = async (event: Event) => {
    event.preventDefault();

    setLoading(true);
    setHelper(initialUserData);
    setIsError(initialErrorData);

    if (!isEmail(formData.email) || !isStrongPassword(formData.password)) {
      setTimeout(() => {
        setHelper({
          email: "email or password is invalid",
          password: "email or password is invalid",
        });
        setIsError({ email: true, password: true });
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      await axiosRequest.post("/session", formData);

      changeAuth(true);
      dispatchNotification({
        type: "SUCCESS",
        message: "User sign in successfully",
      });

      router.push("/");
    } catch (error: any) {
      if (error.response.data.error.message === "user do not exist") {
        setTimeout(() => {
          setHelper({
            email: "email or password is invalid",
            password: "email or password is invalid",
          });
          setIsError({ email: true, password: true });
          setLoading(false);
        }, 1000);
        return;
      }

      dispatchNotification({
        type: "ERROR",
        message: "Something went wrong. Please try again",
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
            autoFocus={true}
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

export default Login;

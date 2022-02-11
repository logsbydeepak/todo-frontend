import { useEffect, useLayoutEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useAuthContext } from "lib/context";
import { useAPICall } from "lib/helper/useAPICall.helper";

import Spinner from "components/common/Spinner";
import PageTitle from "components/common/PageTitle";
import UserItem from "components/elements/UserItemElement";
import {
  ButtonWithIcon,
  ButtonWithSmallIcon,
  ButtonWithTextAndIcon,
} from "components/common/Button";

import style from "styles/pages/user.page.module.scss";
import Input, { InputWithIcon } from "components/common/Input";

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const initialBoolean = {
  name: false,
  email: false,
  password: false,
  currentPassword: false,
};

const initialText = {
  name: "",
  email: "",
  password: "",
  currentPassword: "",
};

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(initialText);
  const [setAPIRequestData] = useAPICall(null);

  const [isInputError, setIsInputError] = useState(initialBoolean);
  const [inputHelper, setInputHelper] = useState(initialText);
  const [isInputLoading, setIsInputLoading] = useState(initialBoolean);

  const { auth } = useAuthContext();
  const router = useRouter();

  myUseLayoutEffect(() => {
    if (auth === null) return;
    if (!auth) {
      router.push("/");
    }
  }, [auth]);

  const getUser = () => {
    setAPIRequestData({
      data: {
        method: "GET",
        url: "/user",
      },
      response: {
        onSuccess: (successResponse: any) => {
          setUserInfo({
            ...userInfo,
            name: successResponse.name,
            email: successResponse.email,
          });
          setIsLoading(false);
        },
        onError: () => {},
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getUser();
  }, []);

  const handleLogoutAll = () => {
    if (userInfo.currentPassword.length === 0) {
      setIsInputError({ ...isInputError, currentPassword: true });
      setInputHelper({
        ...inputHelper,
        currentPassword: "current password can't be empty",
      });
    }
  };

  const handleDeleteAccount = () => {};

  return (
    <>
      <Head>
        <title>TODO - User</title>
      </Head>
      <PageTitle title="Your Account" subtitle="Manage your account details" />

      {isLoading ? (
        <div className={style.spinner}>
          <Spinner className={style.spinner__container} />
        </div>
      ) : (
        <>
          <InputWithIcon
            value={userInfo.name}
            handleOnChange={() => {}}
            helper={inputHelper.name}
            type="text"
            placeholder="Name"
          >
            <div className="right">
              <ButtonWithSmallIcon
                icon="settings_backup_restore"
                isLoading={isInputLoading.name}
                handleOnClick={() => {}}
              />
              <ButtonWithSmallIcon
                icon="done_all"
                isLoading={isInputLoading.name}
                handleOnClick={() => {}}
              />
            </div>
          </InputWithIcon>

          <InputWithIcon
            value={userInfo.email}
            handleOnChange={() => {}}
            helper={inputHelper.email}
            type="email"
            placeholder="Email"
          >
            <div className="right">
              <ButtonWithSmallIcon
                icon="settings_backup_restore"
                isLoading={false}
                handleOnClick={() => {}}
              />
              <ButtonWithSmallIcon
                icon="done_all"
                isLoading={isInputLoading.email}
                handleOnClick={() => {}}
              />
            </div>
          </InputWithIcon>

          <InputWithIcon
            value={""}
            handleOnChange={() => {}}
            helper={inputHelper.email}
            type="password"
            placeholder="Password"
          >
            <div className="right">
              <ButtonWithSmallIcon
                icon="done_all"
                isLoading={isInputLoading.password}
                handleOnClick={() => {}}
              />
            </div>
          </InputWithIcon>

          <InputWithIcon
            value={""}
            handleOnChange={() => {}}
            helper={inputHelper.currentPassword}
            type="password"
            placeholder="Current Password"
          />

          <div className={style.button}>
            <ButtonWithTextAndIcon
              icon="logout"
              text="LOGOUT ALL"
              clickHandler={handleLogoutAll}
              loading={false}
            />

            <ButtonWithTextAndIcon
              icon="delete_outline"
              text="DELETE ACCOUNT"
              clickHandler={handleDeleteAccount}
              warning={true}
              loading={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default User;

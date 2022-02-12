import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useAuthContext } from "lib/context";
import { useAPICall } from "lib/helper/useAPICall.helper";

import Spinner from "components/common/Spinner";
import PageTitle from "components/common/PageTitle";
import {
  ButtonWithSmallIcon,
  ButtonWithTextAndIcon,
} from "components/common/Button";

import style from "styles/pages/user.page.module.scss";
import { InputWithIcon } from "components/common/Input";

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

const initialBooleanWithoutCurrentPassword = {
  name: false,
  email: false,
  password: false,
};

const initialTextWithNameAndEmail = {
  name: "",
  email: "",
};

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(initialTextWithNameAndEmail);
  const [setAPIRequestData] = useAPICall(null);

  const [showIcon, setShowIcon] = useState(
    initialBooleanWithoutCurrentPassword
  );
  const [inputValue, setInputValue] = useState(initialText);
  const [inputHelper, setInputHelper] = useState(initialText);
  const [isInputError, setIsInputError] = useState(initialBoolean);
  const [isInputLoading, setIsInputLoading] = useState(initialBoolean);
  const [isDisabledForm, setIsDisabledForm] = useState(false);

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
          setInputValue({
            ...inputValue,
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
    if (inputValue.currentPassword.length === 0) {
      setIsInputError({ ...isInputError, currentPassword: true });
      setInputHelper({
        ...inputHelper,
        currentPassword: "current password can't be empty",
      });
    }
  };

  const handleDeleteAccount = () => {};

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, name: event.target.value });
    setShowIcon({ ...showIcon, name: true });
  };

  const handleNameRest = () => {
    setInputValue({ ...inputValue, name: userInfo.name });
    setShowIcon({ ...showIcon, name: false });
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, email: event.target.value });
    setShowIcon({ ...showIcon, email: true });
  };

  const handleEmailRest = () => {
    setInputValue({ ...inputValue, email: userInfo.email });
    setShowIcon({ ...showIcon, email: false });
  };
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, password: event.target.value });
    setShowIcon({ ...showIcon, password: true });
  };

  const handleChangeCurrentPassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue({ ...inputValue, currentPassword: event.target.value });
  };
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
            value={inputValue.name}
            handleOnChange={handleChangeName}
            helper={inputHelper.name}
            type="text"
            placeholder="Name"
            isDisabled={isDisabledForm}
          >
            {showIcon.name && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="settings_backup_restore"
                  isLoading={isInputLoading.name}
                  handleOnClick={handleNameRest}
                  isDisabled={isDisabledForm}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={isInputLoading.name}
                  handleOnClick={() => {}}
                  isDisabled={isDisabledForm}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputValue.email}
            handleOnChange={handleChangeEmail}
            helper={inputHelper.email}
            type="email"
            placeholder="Email"
            isDisabled={isDisabledForm}
          >
            {showIcon.email && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="settings_backup_restore"
                  isLoading={false}
                  handleOnClick={handleEmailRest}
                  isDisabled={isDisabledForm}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={isInputLoading.email}
                  handleOnClick={() => {}}
                  isDisabled={isDisabledForm}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputValue.password}
            handleOnChange={handleChangePassword}
            helper={inputHelper.email}
            type="password"
            placeholder="Password"
            isDisabled={isDisabledForm}
          >
            {showIcon.password && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={isInputLoading.password}
                  handleOnClick={() => {}}
                  isDisabled={isDisabledForm}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputValue.currentPassword}
            handleOnChange={handleChangeCurrentPassword}
            helper={inputHelper.currentPassword}
            type="password"
            placeholder="Current Password"
            isDisabled={isDisabledForm}
          />

          <div className={style.button}>
            <ButtonWithTextAndIcon
              icon="logout"
              text="LOGOUT ALL"
              clickHandler={handleLogoutAll}
              loading={false}
              isDisabled={isDisabledForm}
            />

            <ButtonWithTextAndIcon
              icon="delete_outline"
              text="DELETE ACCOUNT"
              clickHandler={handleDeleteAccount}
              warning={true}
              loading={false}
              isDisabled={isDisabledForm}
            />
          </div>
        </>
      )}
    </>
  );
};

export default User;

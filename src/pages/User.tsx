import {
  ChangeEvent,
  Fragment,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useAuthContext, useNotificationContext } from "lib/context";
import { useAPICall } from "lib/helper/useAPICall.helper";

import Spinner from "components/common/Spinner";
import PageTitle from "components/common/PageTitle";
import {
  ButtonWithSmallIcon,
  ButtonWithTextAndIcon,
} from "components/common/Button";

import { InputWithIcon } from "components/common/Input";
import iconStyle from "components/common/styles/iconColor.module.scss";
import style from "styles/pages/user.page.module.scss";
import isStrongPassword from "validator/lib/isStrongPassword";
import Modal from "components/common/Modal";
import { getUser } from "lib/handler/user/get.user";
import { useImmer } from "use-immer";
import { handleChangeTodoStatus } from "lib/handler/todo/changeStatus.todo.handler";
import { logoutAllUser } from "lib/handler/user/logoutAll.user";

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const initialBoolean = {
  name: false,
  email: false,
  password: false,
  currentPassword: false,
};

export const initialText = {
  name: "",
  email: "",
  password: "",
  currentPassword: "",
};

export const initialBooleanWithoutCurrentPassword = {
  name: false,
  email: false,
  password: false,
};

export const initialTextWithNameAndEmail = {
  name: "",
  email: "",
};

const User = () => {
  const [inputState, setInputState] = useImmer({
    value: initialText,
    helper: initialText,
    isError: initialBoolean,
    isLoading: initialBoolean,
    showIcon: initialBooleanWithoutCurrentPassword,
  });

  const [pageState, setPageState] = useImmer({
    userInfo: initialTextWithNameAndEmail,
    isLoadingUser: false,
    isDisabled: false,
    showModal: false,
    isLoadingLogoutAllButton: false,
    isLoadingDeleteButton: false,
  });

  const router = useRouter();
  const [setAPIRequestData] = useAPICall(null);
  const { auth, changeAuth } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  myUseLayoutEffect(() => {
    if (auth === null) return;
    if (!auth) {
      router.push("/");
    }
  }, [auth]);

  useEffect(() => {
    getUser(setAPIRequestData, setPageState, setInputState);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (
      !(
        inputName === "email" ||
        inputName === "name" ||
        inputName === "password" ||
        inputName === "currentPassword"
      )
    )
      return;

    setInputState((draft) => {
      draft.value[inputName] = inputValue;
      if (inputName === "currentPassword") return;
      draft.showIcon[inputName] = true;
      if (draft.value.password.length !== 0) return;
      draft.showIcon.password = false;
    });
  };

  return (
    <>
      <Head>
        <title>TODO - User</title>
      </Head>
      <PageTitle title="Your Account" subtitle="Manage your account details" />

      {pageState.isLoadingUser ? (
        <div className={style.spinner}>
          <Spinner className={style.spinner__container} />
        </div>
      ) : (
        <>
          <InputWithIcon
            value={inputState.value.name}
            handleOnChange={handleInputChange}
            helper={inputState.helper.name}
            type="text"
            placeholder="Name"
            isDisabled={pageState.isDisabled}
            isError={inputState.isError.name}
            name="name"
          >
            {inputState.showIcon.name && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="settings_backup_restore"
                  isLoading={inputState.isLoading.name}
                  handleOnClick={() => {}}
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__reset}`}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={inputState.isLoading.name}
                  handleOnClick={() => {}}
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__done}`}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputState.value.email}
            handleOnChange={handleInputChange}
            helper={inputState.helper.email}
            type="email"
            isError={inputState.isError.email}
            placeholder="Email"
            isDisabled={pageState.isDisabled}
            name="email"
          >
            {inputState.showIcon.email && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="settings_backup_restore"
                  isLoading={false}
                  handleOnClick={() => {}}
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__reset}`}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={inputState.isLoading.email}
                  handleOnClick={() => {}}
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__done}`}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputState.value.password}
            handleOnChange={handleInputChange}
            helper={inputState.helper.password}
            type="password"
            placeholder="Password"
            isDisabled={pageState.isDisabled}
            isError={inputState.isError.password}
            name="password"
          >
            {inputState.showIcon.password && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={inputState.isLoading.password}
                  handleOnClick={() => {}}
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__done}`}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputState.value.currentPassword}
            handleOnChange={handleInputChange}
            helper={inputState.helper.currentPassword}
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            isError={inputState.isError.currentPassword}
            isDisabled={pageState.isDisabled}
          />

          <div className={style.button}>
            <ButtonWithTextAndIcon
              icon="logout"
              text="LOGOUT ALL"
              clickHandler={() => {
                logoutAllUser(
                  setAPIRequestData,
                  inputState,
                  setPageState,
                  setInputState,
                  changeAuth,
                  dispatchNotification
                );
              }}
              loading={pageState.isLoadingLogoutAllButton}
              isDisabled={pageState.isDisabled}
            />

            <ButtonWithTextAndIcon
              icon="delete_outline"
              text="DELETE ACCOUNT"
              loading={pageState.isLoadingDeleteButton}
              clickHandler={() => {}}
              warning={true}
              isDisabled={pageState.isDisabled}
            />
          </div>
          {pageState.showModal && (
            <Modal handleOnCancel={() => {}} handleOnContinue={() => {}} />
          )}
        </>
      )}
    </>
  );
};

export default User;

import { ChangeEvent, useEffect, useLayoutEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useAuthContext, useNotificationContext } from "global/context";
import { useAPICall } from "global/hooks";

import { Spinner, PageTitle, InputWithIcon } from "global/components";

import style from "./user.page.module.scss";
import { handleGetUser } from "./handler/get.user.handler";
import { useImmer } from "use-immer";
import {
  initialBoolean,
  initialBooleanWithoutCurrentPassword,
  initialText,
  initialTextWithNameAndEmail,
} from "./data";
import { LogoutAllAndDeleteUserButton } from "./components/LogoutAllAndDeleteUserButton";
import { NameInput } from "./components/NameInput";
import { EmailInput } from "./components/EmailInput";
import { PasswordInput } from "./components/PasswordInput";

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const UserPage = () => {
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
    handleGetUser(setAPIRequestData, setPageState, setInputState);
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
      draft.showIcon.name =
        draft.value.name === pageState.userInfo.name ? false : true;
      draft.showIcon.email =
        draft.value.email === pageState.userInfo.email ? false : true;
      if (draft.value.password.length !== 0) return;
      draft.showIcon.password = false;
      draft.isError.password = false;
      draft.helper.password = "";
    });
  };

  const handleInputReset = (target: "name" | "email") => {
    setInputState((draft) => {
      draft.value[target] = pageState.userInfo[target];
      draft.showIcon[target] = false;
      draft.isError[target] = false;
      draft.helper[target] = "";
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
          <NameInput
            inputState={inputState}
            setInputState={setInputState}
            pageState={pageState}
            setPageState={setPageState}
            handleInputChange={handleInputChange}
            handleInputReset={handleInputReset}
          />

          <EmailInput
            inputState={inputState}
            setInputState={setInputState}
            pageState={pageState}
            setPageState={setPageState}
            handleInputChange={handleInputChange}
            handleInputReset={handleInputReset}
          />

          <PasswordInput
            inputState={inputState}
            setInputState={setInputState}
            pageState={pageState}
            setPageState={setPageState}
            handleInputChange={handleInputChange}
          />

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

          <LogoutAllAndDeleteUserButton
            inputState={inputState}
            setInputState={setInputState}
            pageState={pageState}
            setPageState={setPageState}
          />
        </>
      )}
    </>
  );
};

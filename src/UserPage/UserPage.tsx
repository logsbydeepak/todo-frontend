import { ChangeEvent, useEffect, useLayoutEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useAuthContext } from "global/context/AuthContext";
import { useAPICall } from "global/hooks";

import { PageTitle } from "global/components/PageTitle";
import { InputWithIcon } from "global/components/Input";

import { handleGetUser } from "./helper/handleGetUser";
import { useImmer } from "use-immer";
import {
  initialBoolean,
  initialBooleanWithoutCurrentPassword,
  initialText,
  initialTextWithNameAndEmail,
} from "./helper/data";

import { LogoutAllAndDeleteUserButton } from "./components/LogoutAllAndDeleteUserButton/LogoutAllAndDeleteUserButton";
import { NameInput } from "./components/Input/NameInput";
import { EmailInput } from "./components/Input/EmailInput";
import { PasswordInput } from "./components/Input/PasswordInput";
import { HelperTextAndSpinner } from "../global/components/HelperTextAndSpinner";

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
    isLoadingUserError: false,
    isDisabled: false,
    showModal: false,
    isLoadingLogoutAllButton: false,
    isLoadingDeleteButton: false,
  });

  const router = useRouter();
  const [setAPIRequestData] = useAPICall();
  const { auth } = useAuthContext();

  myUseLayoutEffect(() => {
    if (auth === null) return;
    if (!auth) {
      router.push("/");
    }
  }, [auth]);

  useEffect(() => {
    if (!auth) return;
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

      <HelperTextAndSpinner
        isError={pageState.isLoadingUserError}
        isLoading={pageState.isLoadingUser}
        helperText="No user info to show"
      />

      {!(pageState.isLoadingUser || pageState.isLoadingUserError) && (
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

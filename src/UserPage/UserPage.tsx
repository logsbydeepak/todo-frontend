import { ChangeEvent, useEffect } from "react";

import Head from "next/head";

import { useAPICall } from "global/hooks";

import { PageTitle } from "global/components/PageTitle";
import { InputWithIcon } from "global/components/Input";

import { useImmer } from "use-immer";
import { Navbar } from "AppPage/components/Navbar";
import { handleGetUser } from "./helper/handleGetUser";
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

export var UserPage = () => {
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

  const [setAPIRequestData] = useAPICall();

  useEffect(() => {
    handleGetUser(setAPIRequestData, setPageState, setInputState);
  }, [setAPIRequestData, setInputState, setPageState]);

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
      draft.showIcon.name = draft.value.name !== pageState.userInfo.name;
      draft.showIcon.email = draft.value.email !== pageState.userInfo.email;
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
      <Navbar auth />
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

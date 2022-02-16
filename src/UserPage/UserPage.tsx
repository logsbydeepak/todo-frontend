import { ChangeEvent, useEffect, useLayoutEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useAuthContext, useNotificationContext } from "global/context";
import { useAPICall } from "global/hooks";

import {
  Spinner,
  PageTitle,
  ButtonWithSmallIcon,
  ButtonWithTextAndIcon,
  InputWithIcon,
  Modal,
} from "global/components";

import iconStyle from "global/components/styles/iconColor.module.scss";
import style from "./user.page.module.scss";
import { handleGetUser } from "./handler/get.user.handler";
import { useImmer } from "use-immer";
import { handleUpdateUserInfo } from "./handler/update.user.handler";
import { handleDeleteAndLogoutAllUser } from "./handler/deleteAndLogoutAll.user";
import {
  initialBoolean,
  initialBooleanWithoutCurrentPassword,
  initialText,
  initialTextWithNameAndEmail,
} from "./data";

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
                  handleOnClick={() => handleInputReset("name")}
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__reset}`}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={inputState.isLoading.name}
                  handleOnClick={() =>
                    handleUpdateUserInfo(
                      setAPIRequestData,
                      inputState,
                      setPageState,
                      setInputState,
                      "name"
                    )
                  }
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
                  handleOnClick={() => handleInputReset("email")}
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__reset}`}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={inputState.isLoading.email}
                  handleOnClick={() =>
                    handleUpdateUserInfo(
                      setAPIRequestData,
                      inputState,
                      setPageState,
                      setInputState,
                      "email"
                    )
                  }
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
                  isDisabled={pageState.isDisabled}
                  className={`${iconStyle.icon__done}`}
                  handleOnClick={() =>
                    handleUpdateUserInfo(
                      setAPIRequestData,
                      inputState,
                      setPageState,
                      setInputState,
                      "password"
                    )
                  }
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
              clickHandler={() =>
                handleDeleteAndLogoutAllUser(
                  "logoutAll",
                  setAPIRequestData,
                  inputState,
                  setPageState,
                  setInputState,
                  changeAuth,
                  dispatchNotification
                )
              }
              loading={pageState.isLoadingLogoutAllButton}
              isDisabled={pageState.isDisabled}
            />

            <ButtonWithTextAndIcon
              icon="delete_outline"
              text="DELETE ACCOUNT"
              loading={pageState.isLoadingDeleteButton}
              clickHandler={() => {
                setPageState((draft) => {
                  draft.showModal = true;
                });
              }}
              warning={true}
              isDisabled={pageState.isDisabled}
            />
          </div>
          {pageState.showModal && (
            <Modal
              handleOnCancel={() => {
                setPageState((draft) => {
                  draft.showModal = false;
                });
              }}
              handleOnContinue={() => {
                setPageState((draft) => {
                  draft.showModal = false;
                  handleDeleteAndLogoutAllUser(
                    "delete",
                    setAPIRequestData,
                    inputState,
                    setPageState,
                    setInputState,
                    changeAuth,
                    dispatchNotification
                  );
                });
              }}
            />
          )}
        </>
      )}
    </>
  );
};

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

  const [showModal, setShowModel] = useState(false);

  const [isLoadingLogoutAllButton, setIsLoadingLogoutAllButton] =
    useState(false);
  const [isLoadingDeleteButton, setIsLoadingDeleteButton] = useState(false);

  const { auth } = useAuthContext();
  const router = useRouter();

  const { dispatchNotification } = useNotificationContext();
  const { changeAuth } = useAuthContext();

  myUseLayoutEffect(() => {
    if (auth === null) return;
    if (!auth) {
      router.push("/");
    }
  }, [auth]);

  useEffect(() => {
    getUser(
      setAPIRequestData,
      setIsLoading,
      setUserInfo,
      userInfo,
      inputValue,
      setInputValue
    );
  }, []);

  const handleLogoutAll = () => {
    setIsLoadingLogoutAllButton(true);
    setIsDisabledForm(true);
    setInputHelper(initialText);
    setIsInputError(initialBoolean);

    if (inputValue.currentPassword.length === 0) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, currentPassword: true });
        setInputHelper({
          ...inputHelper,
          currentPassword: "current password can't be empty",
        });

        setIsLoadingLogoutAllButton(false);
        setIsDisabledForm(false);
      }, 1000);

      return;
    }

    if (!isStrongPassword(inputValue.currentPassword)) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, currentPassword: true });
        setInputHelper({
          ...inputHelper,
          currentPassword: "invalid password",
        });
        setIsLoadingLogoutAllButton(false);
        setIsDisabledForm(false);
      }, 1000);
      return;
    }

    setAPIRequestData({
      data: {
        method: "DELETE",
        url: "/session/all",
        data: {
          currentPassword: inputValue.currentPassword,
        },
      },
      showErrorDefaultNotification: false,
      response: {
        onSuccess: () => {
          changeAuth(false);
          dispatchNotification({
            type: "SUCCESS",
            message: "Logout all",
          });
        },
        onError: () => {
          setTimeout(() => {
            setIsInputError({ ...isInputError, currentPassword: true });
            setInputHelper({
              ...inputHelper,
              currentPassword: "invalid password",
            });
            setIsLoadingLogoutAllButton(false);
            setIsDisabledForm(false);
          }, 1000);
          return;
        },
      },
    });
  };

  const handleDeleteAccount = () => {
    setIsLoadingDeleteButton(true);
    setIsDisabledForm(true);
    setInputHelper(initialText);
    setIsInputError(initialBoolean);

    if (inputValue.currentPassword.length === 0) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, currentPassword: true });
        setInputHelper({
          ...inputHelper,
          currentPassword: "current password can't be empty",
        });
        setIsLoadingDeleteButton(false);
        setIsDisabledForm(false);
      }, 1000);

      return;
    }

    if (!isStrongPassword(inputValue.currentPassword)) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, currentPassword: true });
        setInputHelper({
          ...inputHelper,
          currentPassword: "invalid password",
        });
        setIsLoadingDeleteButton(false);
        setIsDisabledForm(false);
      }, 1000);
      return;
    }

    setAPIRequestData({
      data: {
        method: "DELETE",
        url: "/user",
        data: {
          currentPassword: inputValue.currentPassword,
        },
      },
      showErrorDefaultNotification: false,
      response: {
        onSuccess: () => {
          changeAuth(false);
          dispatchNotification({
            type: "SUCCESS",
            message: "User deleted",
          });
        },
        onError: () => {
          setTimeout(() => {
            setIsInputError({ ...isInputError, currentPassword: true });
            setInputHelper({
              ...inputHelper,
              currentPassword: "invalid password",
            });
            setIsLoadingDeleteButton(false);
            setIsDisabledForm(false);
          }, 1000);
          return;
        },
      },
    });
  };

  const handleNameRest = () => {
    setInputValue({ ...inputValue, name: userInfo.name });
    setShowIcon({ ...showIcon, name: false });
  };

  const handleEmailRest = () => {
    setInputValue({ ...inputValue, email: userInfo.email });
    setShowIcon({ ...showIcon, email: false });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValue({ ...inputValue, [name]: value });

    if (name === "password") {
      if (event.target.value.length === 0) {
        setShowIcon({ ...showIcon, password: false });
      } else {
        setShowIcon({ ...showIcon, password: true });
      }
      return;
    }

    if (name !== "currentPassword") {
      setShowIcon({ ...showIcon, [name]: true });
    }
  };

  const handleOnCancel = () => {
    setIsLoadingLogoutAllButton(false);
    setIsDisabledForm(false);
    setInputHelper(initialText);
    setIsInputError(initialBoolean);
    setShowModel(false);
  };

  const handleOnContinue = () => {
    setShowModel(false);
    handleDeleteAccount();
  };

  const handleUpdatePassword = () => {
    setIsDisabledForm(true);
    setInputHelper({ ...initialText });
    setIsInputError(() => initialBoolean);
    setIsInputLoading({ ...isInputLoading, password: true });

    if (inputValue.password.length === 0) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, password: true });
        setInputHelper({
          ...inputHelper,
          password: "password can't be empty",
        });
        setIsDisabledForm(false);
        setIsInputLoading({ ...isInputLoading, password: false });
      }, 1000);
      return;
    }

    if (!isStrongPassword(inputValue.password)) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, password: true });
        setInputHelper({
          ...inputHelper,
          password: "min of 8 characters, 1 lower case, upper case, symbol",
        });
        setIsDisabledForm(false);
        setIsInputLoading({ ...isInputLoading, password: false });
      }, 1000);
      return;
    }

    if (inputValue.currentPassword.length === 0) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, currentPassword: true });
        setInputHelper({
          ...inputHelper,
          currentPassword: "current password can't be empty",
        });
        setIsDisabledForm(false);
        setIsInputLoading({ ...isInputLoading, password: false });
      }, 1000);
      return;
    }

    if (!isStrongPassword(inputValue.currentPassword)) {
      setTimeout(() => {
        setIsInputError({ ...isInputError, currentPassword: true });
        setInputHelper({
          ...inputHelper,
          currentPassword: "invalid password",
        });
        setIsDisabledForm(false);
      }, 1000);
      setIsInputLoading({ ...isInputLoading, password: false });
      return;
    }

    setAPIRequestData({
      data: {
        method: "PUT",
        url: "/user",
        data: {
          currentPassword: inputValue.currentPassword,
          toUpdate: "password",
          password: inputValue.password,
        },
      },
      showErrorDefaultNotification: false,
      response: {
        onSuccess: () => {
          setIsInputLoading({ ...isInputLoading, password: false });
          setInputValue({ ...inputValue, password: "", currentPassword: "" });
        },
        onError: () => {
          setTimeout(() => {
            setIsInputError({ ...isInputError, currentPassword: true });
            setInputHelper({
              ...inputHelper,
              currentPassword: "invalid password",
            });
            setIsDisabledForm(false);
            setIsInputLoading({ ...isInputLoading, password: false });
          }, 1000);
          return;
        },
      },
    });
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
            handleOnChange={handleChangeInput}
            helper={inputHelper.name}
            type="text"
            placeholder="Name"
            isDisabled={isDisabledForm}
            isError={isInputError.name}
            name="name"
          >
            {showIcon.name && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="settings_backup_restore"
                  isLoading={isInputLoading.name}
                  handleOnClick={handleNameRest}
                  isDisabled={isDisabledForm}
                  className={`${iconStyle.icon__reset}`}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={isInputLoading.name}
                  handleOnClick={() => {}}
                  isDisabled={isDisabledForm}
                  className={`${iconStyle.icon__done}`}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputValue.email}
            handleOnChange={handleChangeInput}
            helper={inputHelper.email}
            type="email"
            isError={isInputError.email}
            placeholder="Email"
            isDisabled={isDisabledForm}
            name="email"
          >
            {showIcon.email && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="settings_backup_restore"
                  isLoading={false}
                  handleOnClick={handleEmailRest}
                  isDisabled={isDisabledForm}
                  className={`${iconStyle.icon__reset}`}
                />
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={isInputLoading.email}
                  handleOnClick={() => {}}
                  isDisabled={isDisabledForm}
                  className={`${iconStyle.icon__done}`}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputValue.password}
            handleOnChange={handleChangeInput}
            helper={inputHelper.password}
            type="password"
            placeholder="Password"
            isDisabled={isDisabledForm}
            isError={isInputError.password}
            name="password"
          >
            {showIcon.password && (
              <div className="right">
                <ButtonWithSmallIcon
                  icon="done_all"
                  isLoading={isInputLoading.password}
                  handleOnClick={handleUpdatePassword}
                  isDisabled={isDisabledForm}
                  className={`${iconStyle.icon__done}`}
                />
              </div>
            )}
          </InputWithIcon>

          <InputWithIcon
            value={inputValue.currentPassword}
            handleOnChange={handleChangeInput}
            helper={inputHelper.currentPassword}
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            isError={isInputError.currentPassword}
            isDisabled={isDisabledForm}
          />

          <div className={style.button}>
            <ButtonWithTextAndIcon
              icon="logout"
              text="LOGOUT ALL"
              clickHandler={handleLogoutAll}
              loading={isLoadingLogoutAllButton}
              isDisabled={isDisabledForm}
            />

            <ButtonWithTextAndIcon
              icon="delete_outline"
              text="DELETE ACCOUNT"
              loading={isLoadingDeleteButton}
              clickHandler={() => {
                setShowModel(true);
              }}
              warning={true}
              isDisabled={isDisabledForm}
            />
          </div>
          {showModal && (
            <Modal
              handleOnCancel={handleOnCancel}
              handleOnContinue={handleOnContinue}
            />
          )}
        </>
      )}
    </>
  );
};

export default User;

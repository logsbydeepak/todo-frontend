import { useAPICall } from "helper/useAPICall.helper";
import { ButtonWithTextAndIcon } from "modules/common/Button";
import PageTitle from "modules/common/PageTitle";
import Spinner from "modules/common/Spinner";
import { useAuthContext } from "modules/context";
import UserItem from "modules/layout/components/UserItem";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import style from "styles/modules/Pages/user.page.module.scss";

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

  const [isError, setIsError] = useState(initialBoolean);
  const [helper, setHelper] = useState(initialText);
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
      setIsError({ ...isError, currentPassword: true });
      setHelper({
        ...helper,
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
          <UserItem
            value={userInfo.name}
            placeHolder={"Name"}
            type={"text"}
            helper={helper.name}
            isError={isError.name}
            isLoading={isInputLoading.name}
          />
          <UserItem
            value={userInfo.email}
            placeHolder={"Email"}
            type={"text"}
            helper={helper.email}
            isError={isError.email}
            isLoading={isInputLoading.email}
          />
          <UserItem
            value={""}
            placeHolder={"Password"}
            type={"password"}
            helper={helper.password}
            isError={isError.password}
            isLoading={isInputLoading.password}
          />
          <UserItem
            value={""}
            placeHolder={"Current Password"}
            type={"password"}
            showButton={false}
            helper={helper.currentPassword}
            isError={isError.currentPassword}
            isLoading={isInputLoading.currentPassword}
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

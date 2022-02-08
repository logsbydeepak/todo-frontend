import { useAPICall } from "helper/useAPICall.helper";
import { ButtonWithTextAndIcon } from "modules/common/Button";
import PageTitle from "modules/common/PageTitle";
import Spinner from "modules/common/Spinner";
import { useAuthContext } from "modules/context";
import UserItem from "modules/layout/components/UserItem";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { setUncaughtExceptionCaptureCallback } from "process";
import { useEffect, useLayoutEffect, useState } from "react";
import style from "styles/modules/Pages/user.page.module.scss";

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [setAPIRequestData] = useAPICall(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "email" });

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
          <UserItem value={userInfo.name} placeHolder={"Name"} type={"text"} />
          <UserItem
            value={userInfo.email}
            placeHolder={"Email"}
            type={"text"}
          />
          <UserItem value={""} placeHolder={"Password"} type={"password"} />
          <UserItem
            value={""}
            placeHolder={"Current Password"}
            type={"password"}
          />
          <div className={style.button}>
            <ButtonWithTextAndIcon
              icon="logout"
              text="LOGOUT ALL"
              clickHandler={() => {}}
              loading={false}
            />

            <ButtonWithTextAndIcon
              icon="delete_outline"
              text="DELETE ACCOUNT"
              clickHandler={() => {}}
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

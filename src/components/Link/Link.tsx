import Link from "next/link";
import { ButtonWithIcon } from "components/Button";

import { useState } from "react";
import { useRouter } from "next/router";
import { useAPICall } from "hooks";
import { useNotificationContext } from "context/NotificationContext";
import { useAuthContext } from "context/AuthContext";
import style from "./Link.module.scss";

export const NoAuthLink = () => (
  <ul className={style.NoAuthLink}>
    <Link href="/Login">
      <a href="/Login">Login</a>
    </Link>

    <Link href="/SignUp">
      <a href="/SignUp">SignUp</a>
    </Link>
  </ul>
);

export const AuthLink = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth } = useAuthContext();
  const router = useRouter();
  const handleOnUserClick = () => {
    router.push("/User");
  };
  const [setAPIRequestData] = useAPICall();
  const { dispatchNotification } = useNotificationContext();

  const handelLogout = async () => {
    setIsLoading(true);

    setAPIRequestData({
      request: {
        method: "DELETE",
        url: "/session",
      },
      onSuccess: () => {
        setIsLoading(false);
        setIsAuth(false);
        dispatchNotification({ type: "SUCCESS", message: "User logout" });
        router.push("/");
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <ul className={style.AuthLink}>
      <ButtonWithIcon
        icon="manage_accounts"
        isLoading={false}
        handleOnClick={handleOnUserClick}
      />
      <ButtonWithIcon
        icon="logout"
        isLoading={isLoading}
        handleOnClick={handelLogout}
      />
    </ul>
  );
};

export default Link;

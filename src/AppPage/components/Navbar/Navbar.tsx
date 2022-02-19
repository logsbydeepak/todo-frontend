import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";

import { useAuthContext } from "global/context/AuthContext";
import { useAPICall } from "global/hooks";
import { useNotificationContext } from "global/context/NotificationContext";

import style from "./Navbar.module.scss";
import { AuthLink, NoAuthLink } from "AppPage/components/Link";

export const Navbar: FunctionComponent = () => {
  const { auth, changeAuth } = useAuthContext();

  const [setAPIRequestData] = useAPICall();
  const { dispatchNotification } = useNotificationContext();

  const router = useRouter();
  useEffect(() => {
    if (!auth) return;
  }, [auth]);

  const handelLogout = async (
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    setIsLoading(true);

    setAPIRequestData({
      request: {
        method: "DELETE",
        url: "/session",
      },
      onSuccess: () => {
        setIsLoading(false);
        dispatchNotification({ type: "SUCCESS", message: "User logout" });
        changeAuth(false);
        router.push("/");
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <header className={style.base}>
        <Link href="/">
          <a className={style.logo}>
            TODO
            <span>.</span>
          </a>
        </Link>

        <div className={style.link}>
          <ul>
            {auth ? <AuthLink handelLogout={handelLogout} /> : <NoAuthLink />}
          </ul>
        </div>
      </header>
    </>
  );
};

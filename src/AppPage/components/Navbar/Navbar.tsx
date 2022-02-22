import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";

import { useAPICall } from "global/hooks";
import { useNotificationContext } from "global/context/NotificationContext";

import style from "./Navbar.module.scss";
import { AuthLink, NoAuthLink } from "AppPage/components/Link";

export const Navbar: FunctionComponent<{ auth: boolean }> = ({ auth }) => {
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
        router.push("/");
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <header className={style.container}>
        <Link href="/">
          <a className={style.logo}>
            TODO
            <span>.</span>
          </a>
        </Link>

        {auth ? <AuthLink handelLogout={handelLogout} /> : <NoAuthLink />}
      </header>
    </>
  );
};

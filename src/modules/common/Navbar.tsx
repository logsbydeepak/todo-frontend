import Link from "next/link";
import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";

import style from "styles/modules/common/navbar.module.scss";
import { AuthLink, NoAuthLink } from "./Link";
import { useAuthContext } from "modules/context/AuthContext";
import { useAPICall } from "helper/useAPICall.helper";
import { useNotificationContext } from "modules/context";
import { useRouter } from "next/router";

const Navbar: FunctionComponent = () => {
  const { auth, changeAuth } = useAuthContext();

  const [setAPIRequestData] = useAPICall(null);
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
      data: {
        method: "DELETE",
        url: "/session",
      },
      response: {
        onSuccess: () => {
          setIsLoading(false);
          dispatchNotification({ type: "SUCCESS", message: "User logout" });
          changeAuth(false);
          router.push("/");
        },
        onError: () => {
          setIsLoading(false);
        },
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

export default Navbar;

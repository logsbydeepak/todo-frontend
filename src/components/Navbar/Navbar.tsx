import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

import { useAPICall } from "hooks";
import { useNotificationContext } from "context/NotificationContext";

import { AuthLink, NoAuthLink } from "components/Link";
import { clearAuthCookie } from "helper";
import style from "./Navbar.module.scss";

const Navbar: FunctionComponent<{ auth: boolean }> = ({ auth }) => {
  const [setAPIRequestData] = useAPICall();
  const { dispatchNotification } = useNotificationContext();
  const router = useRouter();

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
        clearAuthCookie();
        dispatchNotification({ type: "SUCCESS", message: "User logout" });
        router.push("/");
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <header className={style.container}>
      <Link href="/">
        <a href="/" className={style.logo}>
          TODO
          <span>.</span>
        </a>
      </Link>

      {auth ? <AuthLink handelLogout={handelLogout} /> : <NoAuthLink />}
    </header>
  );
};

export default Navbar;

import Link from "next/link";
import { FunctionComponent, useContext, useEffect } from "react";

import style from "styles/modules/common/navbar.module.scss";
import { AuthLink, NoAuthLink } from "./Link";
import { useAuthContext } from "modules/context/AuthContext";
import { useAPICall } from "helper/useAPICall.helper";

const Navbar: FunctionComponent = () => {
  const { auth } = useAuthContext();

  const [setAPIRequestData] = useAPICall(null);

  useEffect(() => {
    if (!auth) return;
  }, [auth]);

  const handelLogout = async () => {};

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

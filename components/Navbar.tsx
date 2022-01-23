import { AuthContext } from "helper/authContext";
import Link from "next/link";
import { FunctionComponent, useContext, useEffect } from "react";

import style from "styles/module/components/navbar.module.scss";
import { AuthLink, NoAuthLink } from "./Link";

const Navbar: FunctionComponent = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) return;
  }, [auth]);

  const handelLogout = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <header className={style.base}>
        <Link href="/">
          <a className={style.logo}>TODO</a>
        </Link>

        <div className={style.link}>
          <ul>
            {auth ? (
              <AuthLink name="Account" handelLogout={handelLogout} />
            ) : (
              <NoAuthLink />
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;

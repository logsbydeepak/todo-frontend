import { axiosRequest } from "@config/axios";
import { AuthContext } from "context/auth.context";
import Link from "next/link";
import { FunctionComponent, useContext, useEffect, useState } from "react";

import style from "styles/module/components/navbar.module.scss";
import { AuthLink, NoAuthLink } from "./Link";

const Navbar: FunctionComponent = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState("User");

  const getUser = async () => {
    try {
      // const request: any = await axiosRequest.get("/user");
      // setUser(request.request.data.name);
    } catch (e: any) {
      // console.log(e.response.data);
    }
  };

  const handelLogout = () => {};

  useEffect(() => {
    if (!auth) {
      return;
    }

    getUser();
  }, [auth]);

  return (
    <>
      <header className={style.base}>
        <Link href="/">
          <a className={style.logo}>TODO</a>
        </Link>

        <div className={style.link}>
          <ul>
            {auth ? (
              <AuthLink name={user} handelLogout={handelLogout} />
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

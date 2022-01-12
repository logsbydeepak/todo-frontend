import { axiosRequest } from "@config/axios";
import { AuthContext } from "context/auth.context";
import Link from "next/link";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import navigationStyle from "../styles/module/components/navbar.module.scss";

const defaultLinks = [
  {
    name: "Login",
    link: "/Login",
  },
  {
    name: "Sign Up",
    link: "/SignUp",
  },
];

const Navbar: FunctionComponent = () => {
  const [links, setLinks] = useState(defaultLinks);
  const { auth } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const request: any = await axiosRequest.get("/user");
      setLinks([
        {
          name: "Home",
          link: "/",
        },
        {
          name: request.data.data.name,
          link: "/User",
        },
      ]);
      console.log();
    } catch (e: any) {
      setLinks(defaultLinks);
      console.log(e.response.data);
    }
  };

  useEffect(() => {
    console.log(auth + "NAV");

    if (!auth) {
      setLinks(defaultLinks);
      return;
    }

    getUser();
  }, [auth]);

  return (
    <>
      <header className={navigationStyle.base}>
        <Link href="/">
          <a className={navigationStyle.logo}>TODO</a>
        </Link>

        <div className={navigationStyle.link}>
          {links.map(({ name, link }, index) => (
            <Link href={link} key={index}>
              <a className={navigationStyle.item}>{name}</a>
            </Link>
          ))}
        </div>
      </header>
    </>
  );
};

export default Navbar;

import Link from "next/link";
import { FunctionComponent } from "react";
import { AuthLink, NoAuthLink } from "components/Link";
import style from "./Navbar.module.scss";

const Navbar: FunctionComponent<{ auth: boolean }> = ({ auth }) => (
  <header className={style.container}>
    <Link href="/">
      <a href="/" className={style.logo}>
        TODO
        <span>.</span>
      </a>
    </Link>

    {auth ? <AuthLink /> : <NoAuthLink />}
  </header>
);

export default Navbar;

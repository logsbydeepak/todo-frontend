import { NextPage } from "next";
import Link from "next/link";

import navigationStyle from "../styles/layout/navigation.module.scss";

interface prop {
  links: { name: string; link: string }[];
}

const Navbar: NextPage<prop> = (prop) => {
  return (
    <>
      <header className={navigationStyle.base}>
        <Link href="/">
          <a className={navigationStyle.logo}>TODO</a>
        </Link>

        <div className={navigationStyle.link}>
          {prop.links.map(({ name, link }, index) => (
            <>
              <Link href={link} key={index}>
                <a className={navigationStyle.item}>{name}</a>
              </Link>
            </>
          ))}
        </div>
      </header>
    </>
  );
};

export default Navbar;

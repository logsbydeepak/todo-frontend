import { NextPage } from "next";
import Link from "next/link";

interface prop {
  links: { name: string; link: string }[];
}

const Navbar: NextPage<prop> = (prop) => {
  return (
    <>
      <header className="navbar">
        <Link href="/">
          <a className="navbar__logo">TODO</a>
        </Link>

        <div className="navbar__links">
          {prop.links.map(({ name, link }, index) => (
            <>
              <Link href={link} key={index}>
                <a className="navbar__links--item">{name}</a>
              </Link>
            </>
          ))}
        </div>
      </header>
    </>
  );
};

export default Navbar;

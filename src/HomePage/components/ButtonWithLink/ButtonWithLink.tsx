import Link from "next/link";
import { FunctionComponent } from "react";

import style from "./ButtonWithLInk.module.scss";

interface Props {
  href: string;
}

export const ButtonWithLink: FunctionComponent<Props> = ({ href }) => {
  return (
    <>
      <Link href={href}>
        <a className={style.buttonWithLink}>Get Started</a>
      </Link>
    </>
  );
};

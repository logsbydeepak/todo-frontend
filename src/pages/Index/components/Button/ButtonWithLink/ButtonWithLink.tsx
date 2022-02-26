import Link from "next/link";
import { FunctionComponent } from "react";

import style from "./ButtonWithLink.module.scss";

interface Props {
  href: string;
}

const ButtonWithLink: FunctionComponent<Props> = ({ href }) => (
  <Link href={href}>
    <a href={href} className={style.buttonWithLink}>
      Get Started
    </a>
  </Link>
);

export default ButtonWithLink;

import Link from "next/link";
import { FunctionComponent } from "react";

import style from "../styles/components/button.module.scss";

type ButtonSimpleProps = {
  link: string;
};

export const ButtonSimple: FunctionComponent<ButtonSimpleProps> = ({
  link,
}) => {
  return (
    <>
      <Link href={link}>
        <a className={style.link}>Get Started</a>
      </Link>
    </>
  );
};

export const ButtonIcon = () => {};

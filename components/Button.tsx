import Link from "next/link";
import { FunctionComponent } from "react";

import style from "../styles/module/components/button.module.scss";

type ButtonSimpleProps = {
  link: string;
};

type ButtonIconProps = {
  icon: string;
  text: string;
  type: "primary" | "warning";
  clickHandler: any;
};

export const ButtonSimple: FunctionComponent<ButtonSimpleProps> = ({
  link,
}) => {
  return (
    <>
      <Link href={link}>
        <a className={`${style.base} ${style.primary}`}>Get Started</a>
      </Link>
    </>
  );
};

export const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  icon,
  text,
  type,
  clickHandler,
}) => {
  return (
    <>
      <button
        className={`${style.base} ${style.icon} ${style[type]}`}
        onClick={clickHandler}
      >
        {text}
        <i className="icon">{icon}</i>
      </button>
    </>
  );
};

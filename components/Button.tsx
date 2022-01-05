import Link from "next/link";
import { FunctionComponent } from "react";

import style from "../styles/components/button.module.scss";

type ButtonSimpleProps = {
  link: string;
};

type ButtonIconProps = {
  icon: string;
  text: string;
  type: "primary" | "warning";
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
}) => {
  return (
    <>
      <button className={`${style.base} ${style.icon} ${style[type]}`}>
        {text}
        <i className="icon">{icon}</i>
      </button>
    </>
  );
};

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
  loading: boolean;
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
  loading = false,
}) => {
  return (
    <>
      <button
        className={`${style.base} ${style.icon} ${style[type]}`}
        onClick={clickHandler}
        disabled={loading}
      >
        {text}
        {!loading && <i className="icon">{icon}</i>}
        {loading && <div className={style.spinner}></div>}
      </button>
    </>
  );
};

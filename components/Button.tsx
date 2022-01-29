import Link from "next/link";
import { FunctionComponent } from "react";

import style from "styles/module/components/button.module.scss";
import Spinner from "./Spinner";

type ButtonSimpleProps = {
  link: string;
};

type ButtonIconProps = {
  icon: string;
  text: string;
  clickHandler: any;
  loading: boolean;
  warning?: boolean;
};

export const ButtonSimple: FunctionComponent<ButtonSimpleProps> = ({
  link,
}) => {
  return (
    <>
      <Link href={link}>
        <a className={`button_link`}>Get Started</a>
      </Link>
    </>
  );
};

export const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  icon,
  text,
  clickHandler,
  warning = false,
  loading = false,
}) => {
  return (
    <>
      <button
        className={`${warning && style.warning}`}
        onClick={clickHandler}
        disabled={loading}
      >
        {text}
        {!loading && <i className={`icon ${style.icon}`}>{icon}</i>}
        {loading && <Spinner />}
      </button>
    </>
  );
};

import Link from "next/link";
import { FunctionComponent, MouseEvent } from "react";

import style from "./styles/button.module.scss";
import { Spinner } from "global/components";

interface ButtonWithLInkProps {
  link: string;
}

interface ButtonWithTextAndIconProps {
  icon: string;
  text: string;
  handleOnClick: () => void;
  isLoading?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  className?: string;
}

interface ButtonWithIconProps {
  icon: string;
  isLoading?: boolean;
  className?: string;
  handleOnClick: () => void;
  isDisabled?: boolean;
}

export const ButtonWithLInk: FunctionComponent<ButtonWithLInkProps> = ({
  link,
}) => {
  return (
    <>
      <Link href={link}>
        <a className={style.buttonWithLink}>Get Started</a>
      </Link>
    </>
  );
};

export const ButtonWithTextAndIcon: FunctionComponent<
  ButtonWithTextAndIconProps
> = ({
  icon,
  text,
  handleOnClick,
  isError = false,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <>
      <button
        className={` ${style.buttonWithTextAndIcon} ${
          isError && style.warningBackground
        }`}
        onClick={(
          event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          event.preventDefault();
          handleOnClick();
        }}
        disabled={isDisabled}
      >
        {text}
        {isLoading ? <Spinner /> : <i>{icon}</i>}
      </button>
    </>
  );
};

export const ButtonWithIcon: FunctionComponent<ButtonWithIconProps> = ({
  icon,
  className,
  handleOnClick,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <>
      <button
        className={`${style.ButtonWithIcon} ${className}`}
        disabled={isDisabled}
        onClick={(
          event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          event.preventDefault();
          handleOnClick();
        }}
      >
        {isLoading ? <Spinner /> : <i>{icon}</i>}
      </button>
    </>
  );
};

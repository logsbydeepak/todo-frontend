import Link from "next/link";
import { FunctionComponent, MouseEvent } from "react";

import style from "./styles/button.module.scss";
import Spinner from "components/common/Spinner";

interface ButtonWithLInkProps {
  link: string;
}

interface ButtonWithTextAndIconProps {
  icon: string;
  text: string;
  clickHandler: any;
  loading: boolean;
  warning?: boolean;
}

interface ButtonWithIconProps {
  loading: boolean;
  isError: boolean;
  handleOnClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => Promise<void>;
}

interface ButtonWithSmallIconProps {
  icon: string;
  isLoading: boolean;
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
        <a className={`button_link`}>Get Started</a>
      </Link>
    </>
  );
};

export const ButtonWithTextAndIcon: FunctionComponent<
  ButtonWithTextAndIconProps
> = ({ icon, text, clickHandler, warning = false, loading = false }) => {
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

export const ButtonWithIcon: FunctionComponent<ButtonWithIconProps> = ({
  loading,
  isError,
  handleOnClick,
}) => {
  return (
    <>
      <button
        className={`${style.base} ${style.icon} ${
          isError ? style.warning : style.primary
        } ${style.button__icon}`}
        disabled={loading}
        onClick={handleOnClick}
      >
        {!loading && <i className="icon">arrow_forward_ios</i>}
        {loading && <Spinner className={style.spinner} />}
      </button>
    </>
  );
};

export const ButtonWithSmallIcon: FunctionComponent<
  ButtonWithSmallIconProps
> = ({ icon, isLoading, className, handleOnClick, isDisabled }) => {
  return (
    <>
      <button
        className={`${style.button__small} ${className}`}
        disabled={isDisabled}
        onClick={(
          event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          event.preventDefault();
          handleOnClick();
        }}
      >
        {isLoading ? (
          <Spinner className={style.button__small__spinner} />
        ) : (
          <i className={`icon ${style.button__small__icon}`}>{icon}</i>
        )}
      </button>
    </>
  );
};

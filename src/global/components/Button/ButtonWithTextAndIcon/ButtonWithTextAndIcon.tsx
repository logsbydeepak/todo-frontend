import { Spinner } from "global/components/Spinner";
import { FunctionComponent, MouseEvent } from "react";

import style from "./ButtonWithIcon.module.scss";

interface Props {
  icon: string;
  text: string;
  handleOnClick: () => void;
  isLoading?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  className?: string;
  warning?: boolean;
}

export const ButtonWithTextAndIcon: FunctionComponent<Props> = ({
  icon,
  text,
  handleOnClick,
  warning = false,
  isError = false,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <>
      <button
        className={`${style.buttonWithTextAndIcon} ${
          isError || (warning && style.warningBackground)
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

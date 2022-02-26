import { Spinner } from "components/Spinner";
import { FunctionComponent, MouseEvent } from "react";

import style from "./ButtonWithTextAndIcon.module.scss";

interface Props {
  icon: string;
  text: string;
  handleOnClick: () => void;
  isLoading?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  warning?: boolean;
}

const ButtonWithTextAndIcon: FunctionComponent<Props> = ({
  icon,
  text,
  handleOnClick,
  warning,
  isError,
  isLoading,
  isDisabled,
}) => (
  <button
    className={`${style.buttonWithTextAndIcon} ${
      isError || (warning && style.warningBackground)
    }`}
    onClick={(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      handleOnClick();
    }}
    disabled={isDisabled}
    type="button"
  >
    {text}
    {isLoading ? <Spinner /> : <i>{icon}</i>}
  </button>
);

ButtonWithTextAndIcon.defaultProps = {
  warning: false,
  isError: false,
  isLoading: false,
  isDisabled: false,
};

export default ButtonWithTextAndIcon;

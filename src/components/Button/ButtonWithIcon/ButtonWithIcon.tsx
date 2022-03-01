import { Spinner } from "components/Spinner";
import { FunctionComponent, MouseEvent } from "react";

import style from "./ButtonWithIcon.module.scss";

interface Props {
  icon: string;
  isLoading?: boolean;
  className?: string;
  handleOnClick: () => void;
  isDisabled?: boolean;
  type?: "button" | "submit";
}

const ButtonWithIcon: FunctionComponent<Props> = ({
  icon,
  className,
  handleOnClick,
  isLoading,
  isDisabled,
  type,
}) => (
  <button
    className={`${style.ButtonWithIcon} ${className}`}
    disabled={isDisabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      handleOnClick();
    }}
  >
    {isLoading ? <Spinner theme="light" /> : <i>{icon}</i>}
  </button>
);

ButtonWithIcon.defaultProps = {
  className: "",
  isLoading: false,
  isDisabled: false,
  type: "button",
};

export default ButtonWithIcon;

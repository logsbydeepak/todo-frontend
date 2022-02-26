import { Spinner } from "components/Spinner";
import { FunctionComponent, MouseEvent } from "react";

import style from "./ButtonWithIcon.module.scss";

interface Props {
  icon: string;
  isLoading?: boolean;
  className?: string;
  handleOnClick: () => void;
  isDisabled?: boolean;
}

export const ButtonWithIcon: FunctionComponent<Props> = ({
  icon,
  className,
  handleOnClick,
  isLoading = false,
  isDisabled = false,
}) => (
  <button
    className={`${style.ButtonWithIcon} ${className}`}
    disabled={isDisabled}
    onClick={(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      handleOnClick();
    }}
  >
    {isLoading ? <Spinner /> : <i>{icon}</i>}
  </button>
);

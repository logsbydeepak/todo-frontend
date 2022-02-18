import { Spinner } from "global/components/Spinner";
import { FunctionComponent, MouseEvent } from "react";

import style from "./ButtonWithTextAndIcon.module.scss";

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

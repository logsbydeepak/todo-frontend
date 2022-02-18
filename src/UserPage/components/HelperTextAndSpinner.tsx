import { Spinner } from "global/components";
import { FunctionComponent } from "react";
import style from "./styles/HelperTextAndSpinner.module.scss";

interface Props {
  isError: boolean;
  isLoading: boolean;
  helperText: string;
}

export const HelperTextAndSpinner: FunctionComponent<Props> = ({
  isError,
  isLoading,
  helperText,
}) => {
  return (
    <>
      {isLoading && (
        <div className={style.container}>
          <Spinner className={style.spinner__container} />
        </div>
      )}

      {isError && (
        <div className={style.container}>
          <p>{helperText}</p>
        </div>
      )}
    </>
  );
};

import { FunctionComponent } from "react";
import style from "./HelperTextAndSpinner.module.scss";
import { Spinner } from "global/components/Spinner";

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
          <Spinner className={style.spinner__container} theme="light" />
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

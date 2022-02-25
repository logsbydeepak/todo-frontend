import { FunctionComponent } from "react";
import { Spinner } from "global/components/Spinner";
import style from "./HelperTextAndSpinner.module.scss";

interface Props {
  isError: boolean;
  isLoading: boolean;
  helperText: string;
}

export const HelperTextAndSpinner: FunctionComponent<Props> = ({
  isError,
  isLoading,
  helperText,
}) => (
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

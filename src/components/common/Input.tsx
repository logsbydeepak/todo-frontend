import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";

import style from "./styles/input.module.scss";

type Props = {
  name: string;
  placeholder: string;
  type: string;
  autoFocus?: boolean;
  value: any;
  onChange: any;
  label: string;
  helper: string;
  isError: boolean;
  disabled?: boolean;
};

const Input: FunctionComponent<Props> = ({
  name,
  placeholder,
  type,
  autoFocus = false,
  value,
  onChange,
  label,
  helper,
  isError,
  disabled = false,
}) => {
  return (
    <>
      <div className={`${style.base} ${isError && style.error}`}>
        <label htmlFor={name} className={style.label}>
          {label}
        </label>
        <input
          autoFocus={autoFocus}
          className={style.input}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        <p className={style.helper}>{helper}</p>
      </div>
    </>
  );
};

interface InputWithIconProps {
  type: string;
  helper: string;
  isError: boolean;
  placeholder: string;
  isDisabled: boolean;
  value: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const InputWithIcon: FunctionComponent<InputWithIconProps> = ({
  type,
  helper,
  isError,
  isDisabled,
  placeholder,
  children,
  value,
  handleOnChange,
}) => {
  return (
    <>
      <div
        className={`${isError && style.error} ${isDisabled && style.disabled}`}
      >
        <form className={`${style.input} ${style.input__icon}`}>
          <input
            type={type}
            disabled={isDisabled}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
          />
          {children}
        </form>
        <p className={style.helper}>{helper}</p>
      </div>
    </>
  );
};

export default Input;

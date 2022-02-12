import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { ButtonWithIcon, ButtonWithSmallIcon } from "./Button";

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
  type?: string;
  helper?: string;
  isError?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  value: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const InputWithIcon: FunctionComponent<InputWithIconProps> = ({
  type = "text",
  helper = "",
  isError = false,
  isDisabled = false,
  placeholder = "Input",
  className = "",
  children,
  value,
  handleOnChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  return (
    <>
      <div
        className={`${isError && style.error} ${
          isDisabled && style.disabled
        } ${className}`}
      >
        <form className={`${style.input} ${style.input__icon}`}>
          <input
            type={inputType}
            disabled={isDisabled}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
          />
          {type === "password" && (
            <div className="right">
              <ButtonWithSmallIcon
                icon={showPassword ? "visibility" : "visibility_off"}
                handleOnClick={() => {
                  setShowPassword(!showPassword);
                  setInputType(showPassword ? "password" : "text");
                }}
              />
            </div>
          )}

          {children}
        </form>
        <p className={style.helper}>{helper}</p>
      </div>
    </>
  );
};

export default Input;

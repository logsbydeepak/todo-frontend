import { ChangeEvent, FunctionComponent, useState } from "react";
import { ButtonWithSmallIcon } from "./Button";

import style from "./styles/input.module.scss";
import iconStyle from "components/common/styles/iconColor.module.scss";

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
          autoComplete="text"
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
  label?: string;
  value: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
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
  label = "",
  name = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  return (
    <>
      <div
        className={`${isError && style.error} ${
          isDisabled && style.disabled
        } ${className} ${style.form__out}`}
      >
        {label.length !== 0 && (
          <label className={style.label} htmlFor={name}>
            {label}
          </label>
        )}
        <div className={`${style.input} ${style.input__icon}`}>
          <input
            type={inputType}
            autoComplete="text"
            disabled={isDisabled}
            id={name}
            placeholder={placeholder}
            value={value}
            name={name}
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
                className={`${iconStyle.icon__visible}`}
              />
            </div>
          )}

          {children}
        </div>
        <p className={style.helper}>{helper}</p>
      </div>
    </>
  );
};

export default Input;

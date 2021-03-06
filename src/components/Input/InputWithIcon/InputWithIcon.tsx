import { ButtonWithIcon } from "components/Button";
import { ChangeEvent, FunctionComponent, useState } from "react";
import iconColor from "components/styles/iconColor.module.scss";
import style from "./InputWithIcon.module.scss";

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

const InputWithIcon: FunctionComponent<InputWithIconProps> = ({
  type = "text",
  helper = "",
  isError = false,
  isDisabled = false,
  placeholder = "Input",
  className = "",
  children,
  value,
  handleOnChange,
  label,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  return (
    <div
      className={`${isError && style.error} ${
        isDisabled && style.disabled
      } ${className} ${style.form__out}`}
    >
      <label className={style.label} htmlFor={name}>
        {label}
      </label>

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
            <ButtonWithIcon
              icon={showPassword ? "visibility" : "visibility_off"}
              handleOnClick={() => {
                setShowPassword(!showPassword);
                setInputType(showPassword ? "password" : "text");
              }}
              className={iconColor.grey}
            />
          </div>
        )}

        {children}
      </div>
      <p className={style.helper}>{helper}</p>
    </div>
  );
};

InputWithIcon.defaultProps = {
  type: "text",
  helper: "",
  isError: false,
  isDisabled: false,
  placeholder: "Input",
  className: "",
  label: "",
  name: "",
};

export default InputWithIcon;

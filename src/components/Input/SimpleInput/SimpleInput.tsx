import { FunctionComponent } from "react";
import style from "./SimpleInput.module.scss";

type Props = {
  name: string;
  placeholder: string;
  type: string;
  value: any;
  onChange: any;
  label: string;
  helper: string;
  isError: boolean;
  disabled?: boolean;
};

const SimpleInput: FunctionComponent<Props> = ({
  name,
  placeholder,
  type,
  value,
  onChange,
  label,
  helper,
  isError,
  disabled = false,
}) => (
  <div className={`${style.base} ${isError && style.error}`}>
    <label htmlFor={name} className={style.label}>
      {label}
    </label>
    <input
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
);

SimpleInput.defaultProps = {
  disabled: false,
};

export default SimpleInput;

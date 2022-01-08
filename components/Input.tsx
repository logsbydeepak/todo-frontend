import { FunctionComponent } from "react";

import inputStyle from "../styles/module/components/input.module.scss";

type Props = {
  name: string;
  placeholder: string;
  type: string;
  autoFocus?: boolean;
  value: any;
  onChange: any;
  label: string;
  helper: string;
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
}) => {
  return (
    <>
      <div className={inputStyle.base}>
        <label htmlFor={name} className={inputStyle.label}>
          {label}
        </label>
        <input
          autoFocus={autoFocus}
          className={inputStyle.input}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <p className={inputStyle.helper}>{helper}</p>
      </div>
    </>
  );
};

export default Input;
